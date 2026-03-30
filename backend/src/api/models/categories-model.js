const db = require('../../db/knex');

exports.getAllCategories = async () => {
  return await db('categories').select('category');
};

exports.getCategoriesByNames = async (categoryNames, trx = db) => {
  return await trx('categories').whereIn(
    'category',
    Array.isArray(categoryNames) ? categoryNames : [categoryNames],
  );
};

exports.createCategories = async (trx, categoryNames) => {
  return await trx('categories')
    .insert(categoryNames.map(category => ({ category })))
    .returning('*');
};

exports.updateCategory = async (oldCategory, newCategory) => {
  return await db('categories')
    .where('category', oldCategory)
    .update({
      category: newCategory,
    })
    .returning('*');
};

exports.deleteCategory = async category => {
  return await db('categories')
    .where('category', category)
    .del()
    .returning('category');
};
