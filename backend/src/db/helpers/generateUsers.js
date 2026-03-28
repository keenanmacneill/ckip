const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

exports.generateUsers = async (num = 1) => {
  const array = [];
  let hashWord;

  for (let i = 0; i < num; i++) {
    hashWord = await bcrypt.hash(faker.internet.password(), 10);

    array.push({
      email: faker.internet.email(),
      password: hashWord,
      role: 'user',
    });
  }
  return array;
};
