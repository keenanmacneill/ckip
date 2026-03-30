const categoriesModel = require('../models/categories-model');

exports.getAllCategories = async () => {
  return await categoriesModel.getAllCategories();
};

exports.createCategory = async category => {
  const normalizedCategory = category.trim().toLowerCase();
  const match = await categoriesModel.getCategoryName(normalizedCategory);

  if (match) {
    const error = new Error('Category already exists.');
    error.status = 400;
    throw error;
  }

  const [newCategory] =
    await categoriesModel.createCategory(normalizedCategory);

  return newCategory;
};

exports.updateCategory = async (oldCategory, newCategory) => {
  const normalizedOldCategory = oldCategory.trim().toLowerCase();
  const normalizedNewCategory = newCategory.trim().toLowerCase();
  const match = await categoriesModel.getCategoryName(normalizedOldCategory);

  if (!match) {
    const error = new Error('Category does not exist.');
    error.status = 404;
    throw error;
  }

  if (match.category === normalizedNewCategory) {
    const error = new Error('No changes detected.');
    error.status = 400;
    throw error;
  }

  const categories = await categoriesModel.getAllCategories();

  for (let obj of categories) {
    if (obj.category === normalizedNewCategory) {
      const error = new Error('Category already exists.');
      error.status = 400;
      throw error;
    }
  }

  const [updatedCategory] = await categoriesModel.updateCategory(
    normalizedOldCategory,
    normalizedNewCategory,
  );

  return updatedCategory;
};

exports.deleteCategory = async category => {
  const normalizedCategory = category.trim().toLowerCase();
  const match = await categoriesModel.getCategoryName(normalizedCategory);

  if (!match) {
    const error = new Error('Category does not exist.');
    error.status = 404;
    throw error;
  }

  const [deletedCategory] =
    await categoriesModel.deleteCategory(normalizedCategory);

  return deletedCategory;
};
