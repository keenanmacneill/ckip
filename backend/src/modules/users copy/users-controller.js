const db = require('../../db/knex');

exports.getAllUsers =
  ('/users',
  async (req, res) => {
    try {
      const users = await db('users').select('email').returning('*');

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
