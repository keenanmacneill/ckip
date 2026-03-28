const express = require('express');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories-controller');

router.get('/', auth, getAllCategories);
router.post('/', auth, adminAuth, createCategory);
router.patch('/:category', auth, adminAuth, updateCategory);
router.delete('/:category', auth, adminAuth, deleteCategory);

module.exports = router;
