const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./modules/users/user-routes');
const reportRoutes = require('./modules/reports/report-routes');

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

module.exports = app;
