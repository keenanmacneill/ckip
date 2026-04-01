const db = require('../../db/knex');

exports.getAllUsers = async () => {
  return await db('users').select('email');
};

exports.getUserById = async id => {
  return await db('users')
    .select('id', 'email', 'role')
    .where('id', id)
    .first();
};

exports.getUserReports = async email => {
  return await db('users')
    .join('reports', 'users.id', 'submitted_by')
    .join('report_categories', 'reports.id', 'report_id')
    .join('categories', 'category_id', 'categories.id')
    .select(
      'reports.id',
      'email',
      'role',
      'title',
      'summary',
      'mgrs',
      'lat_long',
      'created_at',
      'recommendations',
      'priority',
      'classification',
    )
    .select(db.raw('ARRAY_AGG(categories.category) as categories'))
    .groupBy(
      'reports.id',
      'email',
      'role',
      'title',
      'summary',
      'mgrs',
      'lat_long',
      'created_at',
      'recommendations',
      'priority',
      'classification',
    )
    .where('users.email', email);
};

exports.updateUser = async (user, oldEmail, newEmail, newHashWord) => {
  return await db('users')
    .where('email', oldEmail)
    .update({
      ...user,
      email: newEmail,
      password: newHashWord,
    })
    .returning('id', 'email', 'role');
};

exports.deleteUser = async email => {
  return await db('users')
    .where('email', email)
    .del()
    .returning(['id', 'email', 'role']);
};
