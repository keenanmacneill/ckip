const { generateInt } = require('./generateInt.js');

exports.generateReportCategories = (numReports = 100) => {
  const array = [];

  for (let reportId = 1; reportId <= numReports; reportId++) {
    const used = new Set();

    const numCategories = generateInt(1, 3); // how many per report

    while (used.size < numCategories) {
      const categoryId = generateInt(1, 11);

      if (!used.has(categoryId)) {
        used.add(categoryId);

        array.push({
          report_id: reportId,
          category_id: categoryId,
        });
      }
    }
  }

  return array;
};
