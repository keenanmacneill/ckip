const { generateUsers } = require('../helpers/generateUsers');

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  const users = await generateUsers(1000);

  if (!users.length) {
    throw new Error('generateUsers returned no rows.');
  }

  await knex.batchInsert('users', users, 1000);
};
