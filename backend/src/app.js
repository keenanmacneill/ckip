const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./modules/routes/user-routes');
const reportRoutes = require('./modules/routes/report-routes');

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

module.exports = app;
