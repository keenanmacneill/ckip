const db = require('../../db/knex');

exports.getAllCategories = async () => {
  return await db('categories').select('category');
};

exports.getCategoryName = async category => {
  return await db('categories').select('*').where('category', category).first();
};

exports.createCategory = async category => {
  return await db('categories').insert({ category }).returning('*');
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
