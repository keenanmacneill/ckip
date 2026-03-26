const db = require('../../db/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

exports.getCurrentUser = async (req, res) => {
  try {
    console.log(req.cookies);
    const { email } = req.cookies.user;

    const reports = await db('users')
      .join('reports', 'users.id', 'submitted_by')
      .select('title', 'summary', 'mgrs', 'created_at')
      .where('users.email', email);

    res.status(201).json({ email, reports });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const createUser = async user => {
  return await db('users').insert(user).returning(['id', 'email']);
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
    const [newUser] = await createUser({ email, password: hashWord });

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
        email: email,
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
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out.' });
};
