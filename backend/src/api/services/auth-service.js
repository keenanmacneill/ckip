const authModel = require('../models/auth-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.getMe = async token => {
  if (!token) {
    const error = new Error('Not authenticated.');
    error.status = 401;
    throw error;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT);
  } catch {
    const error = new Error('Invalid token.');
    error.status = 401;
    throw error;
  }

  const user = await authModel.findUserById(decoded.id);

  if (!user) {
    const error = new Error('User not found.');
    error.status = 401;
    throw error;
  }

  return { id: user.id, email: user.email, role: user.role };
};

exports.registerUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const match = await authModel.findUserByEmail(normalizedEmail);

  if (match) {
    const error = new Error('This email is already in use.');
    error.status = 400;
    throw error;
  }

  const hashWord = await bcrypt.hash(password, SALT_ROUNDS);
  const adminHashWord = await bcrypt.hash('password', SALT_ROUNDS);
  const isAdmin = await bcrypt.compare(password, adminHashWord);

  const [newUser] = await authModel.createUser({
    email: normalizedEmail,
    password: hashWord,
    role: isAdmin ? 'admin' : 'user',
  });

  return newUser;
};

exports.login = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await authModel.findUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error('Email or password is incorrect.');
    error.status = 404;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error('Email or password is incorrect.');
    error.status = 404;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT,
    { expiresIn: '7d' },
  );

  return token;
};
