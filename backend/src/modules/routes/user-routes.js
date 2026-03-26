const express = require('express');
const router = express.Router();

const {
  getUserId,
  getAllUsers,
  registerUser,
  getUserReports,
  updateUser,
  deleteUser,
} = require('../controllers/users-controller');

router.get('/:id/reports', getUserReports);
router.get('/:id', getUserId);
router.get('/', getAllUsers);
router.post('/', registerUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
