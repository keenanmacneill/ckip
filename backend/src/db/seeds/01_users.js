const { generateFakeUsers } = require('./helpers/generateFakeUsers');

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex('users').insert(await generateFakeUsers(100));
};
