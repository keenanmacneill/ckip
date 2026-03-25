const {
  generateReportCategories,
} = require('./helpers/generateReportCategories');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('report_categories').del();
  await knex('report_categories').insert(generateReportCategories(100));
};
