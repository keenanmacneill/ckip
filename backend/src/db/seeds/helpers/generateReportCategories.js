const { generateInt } = require('./generateInt');

exports.generateReportCategories = (num = 1) => {
  const array = [];

  for (let i = 0; i < num; i++) {
    array.push({
      report_id: generateInt(1, 100),
      category_id: generateInt(1, 11),
    });
  }
  return array;
};
