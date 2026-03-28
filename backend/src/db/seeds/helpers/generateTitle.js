const { faker } = require('@faker-js/faker');

const locations = [
  'Donetsk Oblast',
  'Luhansk Oblast',
  'Kharkiv Oblast',
  'Zaporizhzhia Oblast',
  'Kherson Oblast',
  'Dnipro City',
  'Mykolaiv Region',
  'Odesa Oblast',
  'Sumy Region',
  'Chernihiv Region',
  'Kyiv Oblast',
  'Bakhmut Area',
  'Mariupol Urban Area',
  'Kramatorsk Sector',
  'Sloviansk Area',
  'Poltava Region',
  'Lviv Region',
  'Rzeszów Area',
  'Lublin Voivodeship',
  'Vilnius Region',
];

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
  return `${faker.helpers.arrayElement(locations)}: ${faker.helpers.arrayElement(
    topics,
  )} ${faker.helpers.arrayElement(impacts)}`;
};
