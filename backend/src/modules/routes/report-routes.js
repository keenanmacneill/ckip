const express = require('express');
const router = express.Router();
const { getAllReports } = require('../controllers/reports-controller');

router.get('/', getAllReports);

module.exports = router;
