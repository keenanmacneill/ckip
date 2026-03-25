const { faker } = require('@faker-js/faker');
const { generateMGRS } = require('./generateMGRS');
const { generateInt } = require('./generateInt');

exports.generateReports = async num => {
  const array = [];

  for (let i = 0; i < num; i++) {
    array.push({
      title: faker.lorem.sentence(),
      summary: faker.lorem.paragraph(),
      MGRS: generateMGRS(),
      created_at: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      submitted_by: generateInt(1, 100),
    });
  }
  return array;
};
