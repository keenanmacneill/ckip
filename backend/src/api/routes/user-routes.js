const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const {
  getUserById,
  getAllUsers,
  getUserReports,
  updateUser,
  deleteUser,
} = require('../controllers/users-controller');

router.get('/:id/reports', auth, getUserReports);
router.get('/:id', auth, getUserById);
router.get('/', auth, getAllUsers);
router.patch('/:id', auth, adminAuth, updateUser);
router.delete('/:id', auth, adminAuth, deleteUser);

module.exports = router;
