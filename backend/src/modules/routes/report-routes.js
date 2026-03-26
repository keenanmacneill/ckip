const express = require('express');
const router = express.Router();

const {
  getReportsByCategory,
  getReportId,
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/reports-controller');

router.get('/category/:category', getReportsByCategory);
router.get('/:id', getReportId);
router.get('/', getAllReports);
router.post('/', createReport);
router.patch('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;
