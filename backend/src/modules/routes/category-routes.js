const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories-controller');

router.get('/', auth, getAllCategories);
router.post('/', auth, createCategory);
router.patch('/:category', auth, updateCategory);
router.delete('/:category', auth, deleteCategory);

module.exports = router;
