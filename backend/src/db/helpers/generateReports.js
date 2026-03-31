const { faker } = require('@faker-js/faker');
const { generateMGRS } = require('./generateMGRS');
const { generateTitle } = require('./generateTitle');
const { generateSummary } = require('./generateSummary');
const { generateRecommendations } = require('./generateRecommendations');

exports.generateReports = async (db, num = 1) => {
  const array = [];
  const users = await db('users').select('id');
  const userIds = users.map(u => u.id);

  for (let i = 0; i < num; i++) {
    const { mgrs, lat, lon, region, city } = generateMGRS();
    const randomIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[randomIndex];

    array.push({
      title: `${region}: ${city} ${generateTitle()}`,
      summary: generateSummary(),
      recommendations: generateRecommendations().join('\n'),
      mgrs: mgrs,
      lat_long: `${lat}, ${lon}`,
      created_at: faker.date
        .between({ from: '2000-01-01', to: Date.now() })
        .toISOString(),
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
      submitted_by: userId,
    });
  }
  return array;
};
