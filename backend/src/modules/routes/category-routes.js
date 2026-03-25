const express = require('express');
const router = express.Router();

const {
  getCategoryReports,
  getCategory,
  getAllCategories,
  createCategory,
  updateCategoryReport,
  updateCategory,
  deleteCategoryReport,
  deleteCategory,
} = require('../controllers/categories-controller');

// router.get('/:category/reports', getCategoryReports);
// router.get('/:category', getCategory);
// router.get('/', getAllCategories);

// router.post('/', createCategory);

// router.patch('/:category/reports/:category', updateCategoryReport);
// router.patch('/:category', updateCategory);

// router.delete('/:category/reports/:category, deleteCategoryReport)
// router.delete('/:category, deleteCategory)

module.exports = router;
