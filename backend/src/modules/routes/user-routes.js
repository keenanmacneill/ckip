const express = require('express');
const router = express.Router();
const { getAllUsers, getUserId } = require('../controllers/users-controller');

router.get('/:id', getUserId);
router.get('/', getAllUsers);

module.exports = router;
