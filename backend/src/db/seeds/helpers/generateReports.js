const { faker } = require('@faker-js/faker');
const { generateMGRS } = require('./generateMGRS');
const { generateInt } = require('./generateInt');

exports.generateReports = async (num = 1) => {
  const array = [];

  for (let i = 0; i < num; i++) {
    array.push({
      title: faker.lorem.sentence(),
      summary: faker.lorem.paragraphs(),
      mgrs: generateMGRS()[0],
      lat_long: `${generateMGRS()[1]}, ${generateMGRS()[2]}`,
      created_at: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      recommendations: faker.lorem.paragraphs(),
      priority: faker.helpers.arrayElement([
        'info only',
        'routine',
        'attention',
        'critical',
      ]),
      submitted_by: generateInt(1, 100),
    });
  }
  return array;
};
