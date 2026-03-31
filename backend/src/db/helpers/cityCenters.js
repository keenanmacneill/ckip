const { rawPopulationCenters } = require('./rawPopulationCenters');

exports.cityCenters = rawPopulationCenters.map(loc => ({
  ...loc,
  name: loc.name.split(',')[0],
}));
