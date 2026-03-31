const { faker } = require('@faker-js/faker');
const mgrs = require('mgrs');
const { populationCenters } = require('./populationCenters');

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const addOffset = (lat, lon, maxOffset = 1) => {
  const latOffset = randomBetween(-maxOffset, maxOffset);
  const lonOffset = randomBetween(-maxOffset, maxOffset);

  return {
    lat: clamp(Number(lat) + latOffset, -79.999999, 83.999999),
    lon: clamp(Number(lon) + lonOffset, -179.999999, 179.999999),
  };
};

exports.generateMGRS = () => {
  for (let i = 0; i < 50; i++) {
    const center = faker.helpers.arrayElement(populationCenters);
    const { lat, lon } = addOffset(center.lat, center.lon, 0.35);

    if (
      Number.isNaN(lat) ||
      Number.isNaN(lon) ||
      lat < -80 ||
      lat > 84 ||
      lon < -180 ||
      lon > 180
    ) {
      continue;
    }

    try {
      const mgrsCoordinate = mgrs.forward([lon, lat], 5);

      if (!mgrsCoordinate || typeof mgrsCoordinate !== 'string') {
        continue;
      }

      return {
        mgrs: mgrsCoordinate,
        lat,
        lon,
        region: center.region,
        city: center.name,
      };
    } catch (err) {
      console.log('MGRS conversion failed:', {
        center,
        lat,
        lon,
        message: err.message,
      });
      continue;
    }
  }

  throw new Error('Failed to generate valid MGRS after 50 attempts');
};
