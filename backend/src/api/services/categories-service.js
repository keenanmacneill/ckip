const categoriesModel = require('../models/categories-model');

exports.getAllCategories = async () => {
  return await categoriesModel.getAllCategories();
};
