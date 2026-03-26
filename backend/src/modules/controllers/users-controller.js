const db = require('../../db/knex');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('email');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db('users')
      .select('email')
      .where('email', req.params.email)
      .first();

    if (!user) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUserReports = async (req, res) => {
  try {
    const [match] = await db('users')
      .select('email')
      .where('email', req.params.email);

    if (!match) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    const reports = await db('users')
      .join('reports', 'users.id', 'submitted_by')
      .select('title', 'summary', 'mgrs', 'created_at')
      .where('users.email', req.params.email);

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const [match] = await db('users')
      .select('email')
      .where('email', req.params.email);

    if (!match) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    const hashWord = await bcrypt.hash(password, SALT_ROUNDS);
    const [updatedUser] = await db('users')
      .where('email', req.params.email)
      .update({
        ...match,
        email,
        password: hashWord,
      })
      .returning('email');

    res.status(200).json(`${updatedUser.email} has been successfully updated.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const [match] = await db('users')
      .select('email')
      .where('email', req.params.email);

    if (!match) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    const [deletedUser] = await db('users')
      .where('email', req.params.email)
      .del()
      .returning('email');

    res
      .status(200)
      .json({ message: `${deletedUser.email} was successfully deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
