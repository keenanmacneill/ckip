const { generateReports } = require('../helpers/generateReports');

exports.seed = async function (knex) {
  await knex('reports').del();

  const reports = await generateReports(knex, 10000);

  if (!reports.length) {
    throw new Error('generateReports returned no rows.');
  }

  await knex.batchInsert('reports', reports, 1000);
};
