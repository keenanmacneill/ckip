const express = require('express');
const cors = require('cors');
const db = require('./db/knex');

const app = express();

app.use(express.json());
app.use(cors());

/* app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('username').returning('*');
    console.log(`USERS: ${users}`);

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); */

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

module.exports = app;
