const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

const userRoutes = require('./api/routes/user-routes');
const reportRoutes = require('./api/routes/report-routes');
const categoryRoutes = require('./api/routes/category-routes');
const authRoutes = require('./api/routes/auth-routes');

app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

module.exports = app;
