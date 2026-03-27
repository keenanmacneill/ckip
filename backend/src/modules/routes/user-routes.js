const express = require('express');
const auth = require('../middleware/auth');

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
router.patch('/:email', auth, updateUser);
router.delete('/:email', auth, deleteUser);

module.exports = router;
