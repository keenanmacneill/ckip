const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const {
  getReportsByCategory,
  getReportId,
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/reports-controller');

router.get('/category/:category', auth, getReportsByCategory);
router.get('/:id', auth, getReportId);
router.get('/', auth, getAllReports);
router.post('/', auth, createReport);
router.patch('/:id', auth, updateReport);
router.delete('/:id', auth, deleteReport);

module.exports = router;
