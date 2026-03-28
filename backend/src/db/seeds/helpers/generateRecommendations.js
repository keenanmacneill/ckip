const { faker } = require('@faker-js/faker');
const { generateInt } = require('./generateInt.js');

const actions = [
  'Conduct follow-on civil reconnaissance',
  'Engage local leadership for validation',
  'Coordinate with NGO partners',
  'Assess infrastructure repair requirements',
  'Monitor population movement patterns',
  'Increase information collection in AO',
];

const focuses = [
  'to confirm reported conditions',
  'to identify resource gaps',
  'to improve situational awareness',
  'to support stability operations',
  'to mitigate further degradation',
];

exports.generateRecommendations = () => {
  const used = new Set();
  const recommendations = [];
  const numRecommendations = generateInt(3, 5);

  while (used.size < numRecommendations) {
    const index = generateInt(0, actions.length - 1);

    if (!used.has(index)) {
      used.add(index);

      const action = actions[index];
      const focus = faker.helpers.arrayElement(focuses);

      recommendations.push(`- ${action} ${focus}`);
    }
  }

  return recommendations;
};
