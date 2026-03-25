const { generateUsers } = require('./helpers/generateUsers');

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  await knex('users').insert(await generateUsers(100));
};
