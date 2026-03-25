const { faker } = require('@faker-js/faker');

const generateUsers = num => [
  {
    username: faker.internet.username(),
  },

  ...Array.from({ length: num - 1 }, () => ({
    username: faker.internet.username(),
  })),
];

exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY');
  await knex('users').insert(generateUsers(10));
};
