const { faker } = require('@faker-js/faker');
const { generateMGRS } = require('./generateMGRS');
const { generateInt } = require('./generateInt');
const { generateTitle } = require('./generateTitle');
const { generateSummary } = require('./generateSummary');
const { generateRecommendations } = require('./generateRecommendations');

exports.generateReports = async (num = 1) => {
  const array = [];

  for (let i = 0; i < num; i++) {
    array.push({
      title: generateTitle(),
      summary: generateSummary(),
      recommendations: generateRecommendations().join('\n'),
      mgrs: generateMGRS()[0],
      lat_long: `${generateMGRS()[1]}, ${generateMGRS()[2]}`,
      created_at: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      priority: faker.helpers.arrayElement([
        'routine',
        'attention',
        'critical',
      ]),
      classification: faker.helpers.arrayElement([
        'secret',
        'top secret',
        'confidential',
      ]),
      submitted_by: generateInt(1, 100),
    });
  }
  return array;
};
