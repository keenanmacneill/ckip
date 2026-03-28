const { generateReports } = require('../helpers/generateReports');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reports').del();
  await knex('reports').insert(await generateReports(100));
};
