const db = require('../../db/knex');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await db('reports')
      .join('users', 'submitted_by', 'users.id')
      .select(
        'title',
        'summary',
        'MGRS',
        'created_at',
        'users.email as submitted_by',
      );

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getReportId = async (req, res) => {
  try {
    const match = await db('reports').select('*').where('id', req.params.id);

    if (!match.length) {
      return res.status(404).json({ message: 'Report does not exist.' });
    }

    const [report] = await db('reports')
      .join('users', 'submitted_by', 'users.id')
      .select(
        'title',
        'summary',
        'MGRS',
        'created_at',
        'users.email as submitted_by',
      )
      .where('reports.id', req.params.id);

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getReportsByCategory = async (req, res) => {
  try {
    const match = await db('reports_categories')
      .select('*')
      .where('category', req.params.category);

    if (!match.length) {
      return res.status(404).json({ message: 'Category does not exist.' });
    }

    const [reports] = await db('reports')
      .join('reports_categories', 'reports.id', 'report_id')
      .join('categories', 'category_id', 'categories.id')
      .select('title', 'summary', 'MGRS', 'created_at', 'submitted_by')
      .where('category', req.params.category);

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
