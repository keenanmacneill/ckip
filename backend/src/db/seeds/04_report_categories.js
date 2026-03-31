const {
  generateReportCategories,
} = require('../helpers/generateReportCategories');

exports.seed = async function (knex) {
  await knex('report_categories').del();

  const reportCategories = await generateReportCategories(knex);

  if (!reportCategories.length) {
    throw new Error('generateReportCategories returned no rows.');
  }

  await knex.batchInsert('report_categories', reportCategories, 1000);
};
