const db = require('../../db/knex');
const bcrypt = require('bcrypt');

const createUser = async user => {
  return await db('users').insert(user).returning(['id', 'username']);
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });
    }

    const match = await db('users').select('*').where('username', username);

    if (!match.length) {
      return res.status(400).json({ message: 'Username not available' });
    }

    const hashWord = await bcrypt.hash(password, 10);
    const [newUser] = await createUser({ username, password: hashWord });

    res.status(201).json(`${newUser.username} has been successfully created.`);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('username');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUserId = async (req, res) => {
  try {
    const user = await db('users')
      .select('username')
      .where('id', req.params.id)
      .first();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [match] = await db('users')
      .select('username')
      .where('id', req.params.id);

    if (!match) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    const hashWord = await bcrypt.hash(password, 10);
    const [updatedUser] = await db('users')
      .where('id', req.params.id)
      .update({
        ...match,
        username,
        password: hashWord,
      })
      .returning('username');

    res
      .status(200)
      .json(`${updatedUser.username} has been successfully updated.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
