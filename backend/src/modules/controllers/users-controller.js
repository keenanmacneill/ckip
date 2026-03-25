const db = require('../../db/knex');

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
