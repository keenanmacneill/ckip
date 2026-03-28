const db = require('../../db/knex');
const { applyQueryFilters } = require('../helpers/applyQueryFilters');

exports.getAllReports = async (req, res) => {
  try {
    const baseQuery = db('reports')
      .join('report_categories', 'reports.id', 'report_categories.report_id')
      .join('categories', 'report_categories.category_id', 'categories.id')
      .join('users', 'reports.submitted_by', 'users.id');

    const reports = await applyQueryFilters(
      baseQuery
        .clone()
        .select(
          'reports.id',
          'reports.title',
          'reports.mgrs',
          'reports.lat_long',
          'reports.priority',
          'reports.summary',
          'reports.recommendations',
          'users.email as submitted_by',
          'reports.created_at',
          'reports.classification',
        )
        .select(db.raw('ARRAY_AGG(categories.category) as categories'))
        .groupBy(
          'reports.id',
          'reports.title',
          'reports.mgrs',
          'reports.lat_long',
          'reports.priority',
          'reports.summary',
          'reports.recommendations',
          'users.email',
          'reports.created_at',
          'reports.classification',
        ),
      req.query,
    );

    const [countResult] = await applyQueryFilters(
      baseQuery.clone().countDistinct('reports.id as total'),
      req.query,
      {
        includeSort: false,
        includePagination: false,
      },
    );

    res.status(200).json({
      data: reports,
      total: Number(countResult?.total || 0),
    });
  } catch (err) {
    console.log(err);
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
      .join('report_categories', 'reports.id', 'report_categories.report_id')
      .join('categories', 'report_categories.category_id', 'categories.id')
      .join('users', 'reports.submitted_by', 'users.id')
      .select(
        'reports.id',
        'reports.title',
        'reports.mgrs',
        'reports.lat_long',
        'reports.priority',
        'reports.summary',
        'reports.recommendations',
        'users.email as submitted_by',
        'reports.created_at',
        'reports.classification',
      )
      .select(db.raw('ARRAY_AGG(categories.category) as categories'))
      .groupBy(
        'reports.id',
        'reports.title',
        'reports.mgrs',
        'reports.lat_long',
        'reports.priority',
        'reports.summary',
        'reports.recommendations',
        'users.email',
        'reports.created_at',
        'reports.classification',
      )
      .where('reports.id', req.params.id);

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getReportsByCategory = async (req, res) => {
  try {
    const match = await db('report_categories')
      .join('categories', 'category_id', 'categories.id')
      .select('*')
      .where('category', req.params.category);

    if (!match.length) {
      return res.status(404).json({ message: 'Category is not valid.' });
    }

    const reports = await db('reports')
      .join('report_categories', 'reports.id', 'report_categories.report_id')
      .join('categories', 'report_categories.category_id', 'categories.id')
      .join('users', 'reports.submitted_by', 'users.id')
      .select(
        'reports.id',
        'reports.title',
        'reports.mgrs',
        'reports.lat_long',
        'reports.priority',
        'users.email as submitted_by',
        'reports.created_at',
      )
      .select(db.raw('ARRAY_AGG(categories.category) as categories'))
      .groupBy(
        'reports.id',
        'reports.title',
        'reports.mgrs',
        'reports.lat_long',
        'reports.priority',
        'reports.summary',
        'reports.recommendations',
        'users.email',
        'reports.created_at',
        'reports.classification',
      )
      .where('category', req.params.category);

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.createReport = async (req, res) => {
  try {
    const {
      title,
      summary,
      mgrs,
      lat_long,
      recommendations,
      priority,
      categories = [],
    } = req.body;

    if (
      !title ||
      !summary ||
      !mgrs ||
      !lat_long ||
      !recommendations ||
      !priority ||
      !categories
    )
      return res.status(401).json({ message: 'All fields are required.' });

    const userId = req.user.id;

    const cleanedCategories = [...new Set(categories.filter(Boolean))];

    if (!cleanedCategories.length) {
      return res
        .status(400)
        .json({ message: 'At least one category is required.' });
    }

    const matchedCategories = await db('categories')
      .select('id', 'category')
      .whereIn('category', cleanedCategories);

    if (matchedCategories.length !== cleanedCategories.length) {
      return res
        .status(404)
        .json({ message: 'One or more categories are not valid.' });
    }

    const newReport = await db.transaction(async trx => {
      const [report] = await trx('reports')
        .insert({
          title,
          summary,
          mgrs,
          lat_long,
          recommendations,
          priority,
          submitted_by: userId,
        })
        .returning('*');

      await trx('report_categories').insert(
        matchedCategories.map(category => ({
          report_id: report.id,
          category_id: category.id,
        })),
      );

      return report;
    });

    res
      .status(201)
      .json({ message: `${newReport.title} has been successfully posted.` });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      summary,
      mgrs,
      lat_long,
      recommendations,
      priority,
      categories = [],
    } = req.body;

    const [existingReport] = await db('reports').select('*').where('id', id);

    if (!existingReport) {
      return res.status(404).json({ message: 'Report does not exist.' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = existingReport.submitted_by === req.user.id;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: 'You can only edit your own reports.' });
    }

    const cleanedCategories = [...new Set(categories.filter(Boolean))];

    if (!cleanedCategories.length) {
      return res
        .status(400)
        .json({ message: 'At least one category is required.' });
    }

    const matchedCategories = await db('categories')
      .select('id', 'category')
      .whereIn('category', cleanedCategories);

    if (matchedCategories.length !== cleanedCategories.length) {
      return res
        .status(404)
        .json({ message: 'One or more categories are not valid.' });
    }

    const existingCategoryRows = await db('report_categories')
      .join('categories', 'report_categories.category_id', 'categories.id')
      .where('report_categories.report_id', id)
      .select('categories.category');

    const existingCategories = existingCategoryRows
      .map(row => row.category)
      .sort();

    const nextCategories = [...cleanedCategories].sort();

    const noReportChanges =
      existingReport.title === title &&
      existingReport.summary === summary &&
      existingReport.mgrs === mgrs &&
      existingReport.lat_long === lat_long &&
      existingReport.recommendations === recommendations &&
      existingReport.priority === priority;

    const noCategoryChanges =
      JSON.stringify(existingCategories) === JSON.stringify(nextCategories);

    if (noReportChanges && noCategoryChanges) {
      return res.status(400).json({ message: 'No changes detected.' });
    }

    const updatedReport = await db.transaction(async trx => {
      const [report] = await trx('reports')
        .where('id', id)
        .update({
          title,
          summary,
          mgrs,
          lat_long,
          recommendations,
          priority,
        })
        .returning('*');

      await trx('report_categories').where('report_id', id).del();

      await trx('report_categories').insert(
        matchedCategories.map(category => ({
          report_id: Number(id),
          category_id: category.id,
        })),
      );

      return report;
    });

    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const [existingReport] = await db('reports')
      .select('title', 'submitted_by')
      .where('id', req.params.id);

    if (!existingReport) {
      return res.status(404).json({ message: 'Report does not exist.' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = existingReport.submitted_by === req.user.id;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: 'You can only delete your own reports.' });
    }

    const [deletedReport] = await db('reports')
      .where('id', req.params.id)
      .del()
      .returning('title');

    res
      .status(200)
      .json({ message: `'${deletedReport.title}' was successfully deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
