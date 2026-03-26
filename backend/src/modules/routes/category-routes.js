const express = require('express');
const router = express.Router();

const {
  getCategoryReports,
  getAllCategories,
  createCategory,
  updateCategoryReport,
  updateCategory,
  deleteCategoryReport,
  deleteCategory,
} = require('../controllers/categories-controller');

router.get('/:category/reports', getCategoryReports);
router.get('/', getAllCategories);

router.post('/', createCategory);

// router.patch('/:category/reports/:id', updateCategoryReport);
router.patch('/:category', updateCategory);

// router.delete('/:category/reports/:id, deleteCategoryReport)
// router.delete('/:category, deleteCategory)

module.exports = router;
