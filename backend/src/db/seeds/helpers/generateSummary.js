const { faker } = require('@faker-js/faker');

const actors = [
  'local population',
  'municipal officials',
  'internally displaced persons',
  'local security forces',
  'NGO partners',
];

const issues = [
  'limited access to clean water',
  'disrupted supply chains',
  'increased population movement',
  'strained healthcare capacity',
  'reduced market activity',
];

const causes = [
  'recent conflict activity',
  'infrastructure degradation',
  'lack of government oversight',
  'economic instability',
  'seasonal conditions',
];

exports.generateSummary = () => {
  return `Recent reporting indicates ${faker.helpers.arrayElement(
    issues,
  )} affecting ${faker.helpers.arrayElement(
    actors,
  )} in the area. The situation is likely driven by ${faker.helpers.arrayElement(
    causes,
  )}, resulting in degraded living conditions and reduced service availability. Continued monitoring is recommended to assess escalation and second-order effects.`;
};
