const db = require('../../db/knex');

exports.getAllCategories = async () => {
  return await db('categories').select('category');
};
