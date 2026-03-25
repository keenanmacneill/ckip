const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserId,
  registerUser,
  updateUser,
} = require('../controllers/users-controller');

router.get('/:id', getUserId);
router.get('/', getAllUsers);

router.post('/', registerUser);

router.patch('/:id', updateUser);

module.exports = router;
