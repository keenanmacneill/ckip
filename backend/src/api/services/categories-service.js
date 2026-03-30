const categoriesModel = require('../models/categories-model');

exports.getAllCategories = async () => {
  return await categoriesModel.getAllCategories();
};

exports.createCategory = async category => {
  const match = await categoriesModel.getCategoryName(category);

  if (match) {
    const error = new Error('Category already exists.');
    error.status = 400;
    throw error;
  }

  const [newCategory] = await categoriesModel.createCategory(category);

  return newCategory;
};

exports.updateCategory = async (oldCategory, newCategory) => {
  const match = await categoriesModel.getCategoryName(oldCategory);

  if (!match) {
    const error = new Error('Category does not exist.');
    error.status = 404;
    throw error;
  }

  if (match.category === newCategory) {
    const error = new Error('No changes detected.');
    error.status = 400;
    throw error;
  }

  const categories = await categoriesModel.getAllCategories();

  for (let obj of categories) {
    if (obj.category === newCategory.trim().toLowerCase()) {
      const error = new Error('Category already exists.');
      error.status = 400;
      throw error;
    }
  }

  const [updatedCategory] = await categoriesModel.updateCategory(
    oldCategory,
    newCategory,
  );

  return updatedCategory;
};

exports.deleteCategory = async category => {
  const match = await categoriesModel.getCategoryName(category);

  if (!match) {
    const error = new Error('Category does not exist.');
    error.status = 404;
    throw error;
  }

  const [deletedCategory] = await categoriesModel.deleteCategory(category);

  return deletedCategory;
};
