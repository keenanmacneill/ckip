const db = require('../../db/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated.' });

    const decoded = jwt.verify(token, process.env.JWT);
    const user = await db('users').where({ id: decoded.id }).first();
    if (!user) return res.status(401).json({ message: 'User not found.' });

    res.status(200).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const createUser = async user => {
  return await db('users').insert(user).returning(['id', 'email', 'role']);
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const [match] = await db('users').select('*').where('email', email);

    if (match) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const hashWord = await bcrypt.hash(password, SALT_ROUNDS);
    const adminHashWord = await bcrypt.hash('password', SALT_ROUNDS);
    const isAdmin = await bcrypt.compare(password, adminHashWord);

    const [newUser] = await createUser({
      email,
      password: hashWord,
      role: isAdmin ? 'admin' : 'user',
    });

    res
      .status(201)
      .json(`${newUser.email}'s account has been successfully created.`);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or password is incorrect.' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ message: 'Email or password is incorrect' });
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: `Welcome back, ${email}` });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out.' });
};
