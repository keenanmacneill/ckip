const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserId,
  registerUser,
  updateUser,
} = require('../controllers/users-controller');

// router.post('/:id/reports', createUserReport);
router.post('/', registerUser);

// router.get('/:id/reports/:id', getUserReportId);
// router.get('/:id/reports', getUserReports);
router.get('/:id', getUserId);
router.get('/', getAllUsers);

// router.patch('/:id/reports/:id', updateUserReport);
router.patch('/:id', updateUser);

// router.delete('/:id/reports/:id, deleteUserReport)
// router.delete('/:id, deleteUser)

module.exports = router;
