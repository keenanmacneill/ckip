const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const {
  getUser,
  getAllUsers,
  getUserReports,
  updateUser,
  deleteUser,
} = require('../controllers/users-controller');

router.get('/:email/reports', auth, getUserReports);
router.get('/:email', auth, getUser);
router.get('/', auth, getAllUsers);
router.patch('/:email', auth, adminAuth, updateUser);
router.delete('/:email', auth, adminAuth, deleteUser);

module.exports = router;
