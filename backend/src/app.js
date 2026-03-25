const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

const userRoutes = require('./modules/routes/user-routes');
const reportRoutes = require('./modules/routes/report-routes');
const categoryRoutes = require('./modules/routes/category-routes');
const authRoutes = require('./modules/routes/auth-routes');

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

module.exports = app;
