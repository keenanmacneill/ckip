const { generateInt } = require('./generateInt.js');

exports.generateReportCategories = async db => {
  const rows = [];

  const reports = await db('reports').select('id');
  const categories = await db('categories').select('id');

  const reportIds = reports.map(report => report.id);
  const categoryIds = categories.map(category => category.id);

  if (!reportIds.length) {
    throw new Error('No reports found. Seed reports before report_categories.');
  }

  if (!categoryIds.length) {
    throw new Error(
      'No categories found. Seed categories before report_categories.',
    );
  }

  for (const reportId of reportIds) {
    const used = new Set();
    const numCategories = generateInt(1, Math.min(3, categoryIds.length));

    while (used.size < numCategories) {
      const randomIndex = Math.floor(Math.random() * categoryIds.length);
      const categoryId = categoryIds[randomIndex];

      if (!used.has(categoryId)) {
        used.add(categoryId);

        rows.push({
          report_id: reportId,
          category_id: categoryId,
        });
      }
    }
  }

  return rows;
};
