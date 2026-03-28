const { faker } = require('@faker-js/faker');
const mgrs = require('mgrs');

exports.generateMGRS = () => {
  // 1. Generate random Lat/Lon within Eastern Europe
  const lat = faker.location.latitude({ min: 45, max: 60, precision: 5 });
  const lon = faker.location.longitude({ min: 15, max: 45, precision: 5 });

  // 2. Convert to mgrs (5 = 1-meter precision, 3 = 100-meter precision)
  const mgrsCoordinate = mgrs.forward([lon, lat], 5);

  return [mgrsCoordinate, lat, lon];
};
