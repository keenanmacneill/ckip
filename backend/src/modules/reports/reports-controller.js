const db = require('../../db/knex');

exports.getAllReports =
  ('/',
  async (req, res) => {
    try {
      const reports = await db('reports')
        .select('title', 'summary', 'MGRS', 'created_at', 'submitted_by')
        .returning('*');

      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
