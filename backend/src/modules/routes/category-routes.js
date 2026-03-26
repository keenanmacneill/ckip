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

router.get('/', getAllCategories);
router.post('/', createCategory);
router.patch('/:category', updateCategory);
router.delete('/:category', deleteCategory);

module.exports = router;
