const { faker } = require('@faker-js/faker');

const topics = [
  'Water Infrastructure Degradation',
  'Local Governance Instability',
  'Market Supply Disruption',
  'Population Displacement',
  'Healthcare Access Limitations',
];

const impacts = [
  'Impacting Civilian Movement',
  'Affecting Local Economy',
  'Increasing Security Risk',
  'Degrading Essential Services',
  'Reducing Public Confidence',
];

exports.generateTitle = () => {
  return `${faker.helpers.arrayElement(topics)} ${faker.helpers.arrayElement(impacts)}`;
};
