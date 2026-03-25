const express = require('express');
const router = express.Router();
const { getAllUsers } = require('./users-controller');

router.get('/', getAllUsers);

module.exports = router;
