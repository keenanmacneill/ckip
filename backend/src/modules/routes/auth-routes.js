const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const {
  getCurrentUser,
  registerUser,
  login,
  logout,
} = require('../controllers/auth-controller');

router.get('/me', auth, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;
