const express = require('express');
const router = express.Router();
const { getAllReports } = require('../controllers/reports-controller');

// router.post('/:id/categories', createReportCategory);
// router.post('/', registerReport);

// router.get('/:id/categories/:id', getReportCategoryId);
// router.get('/:id/categories', getReportCategory);
// router.get('/:id', getReportId);
router.get('/', getAllReports);

// router.patch('/:id/categories/:id', updateReportCategory);
// router.patch('/:id', updateReport);

// router.delete('/:id/categories/:id, deleteReportCategory)
// router.delete('/:id, deleteReport)

module.exports = router;
