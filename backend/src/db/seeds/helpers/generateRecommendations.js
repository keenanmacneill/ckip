const { faker } = require('@faker-js/faker');

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
  const count = faker.number.int({ min: 3, max: 5 });

  return Array.from({ length: count }).map(() => {
    return `- ${faker.helpers.arrayElement(actions)} ${faker.helpers.arrayElement(
      focuses,
    )}`;
  });
};
