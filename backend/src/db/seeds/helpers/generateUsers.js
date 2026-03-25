const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

exports.generateUsers = async (num = 1) => {
  const array = [];
  let hashWord;

  for (let i = 0; i < num; i++) {
    hashWord = await bcrypt.hash(faker.internet.password(), 10);

    array.push({
      username: faker.internet.username(),
      password: hashWord,
    });
  }
  return array;
};
