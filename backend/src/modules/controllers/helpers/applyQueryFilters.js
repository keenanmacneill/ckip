exports.applyQueryFilters = (query, filters) => {
  const {
    category,
    priority,
    id,
    title,
    mgrs,
    submitted_by,
    before,
    after,
    classification,
    limit,
    offset,
    sort_by,
    order,
  } = filters;

  const allowedSortFields = [
    'id',
    'title',
    'mgrs',
    'priority',
    'created_at',
    'classification',
  ];

  const allowedOrder = ['asc', 'desc'];

  // CATEGORY
  if (category && category !== 'all_categories') {
    query.where('categories.category', category);
  }

  // PRIORITY
  if (priority && priority !== 'all_priorities') {
    query.where('reports.priority', priority);
  }

  // ID
  if (id) {
    query.where('reports.id', id);
  }

  // TITLE
  if (title) {
    query.whereILike('reports.title', `%${title}%`);
  }

  // MGRS
  if (mgrs) {
    query.whereILike('reports.mgrs', `%${mgrs}%`);
  }

  // SUBMITTED BY
  if (submitted_by) {
    query.whereILike('users.email', `%${submitted_by}%`);
  }

  // CREATED DATE
  if (after) {
    query.where('reports.created_at', '>', after);
  }

  if (before) {
    query.where('reports.created_at', '<', before);
  }

  // CLASSIFICATION
  if (classification && classification !== 'all_classifications') {
    query.where('reports.classification', classification);
  }

  // SORT
  if (sort_by && allowedSortFields.includes(sort_by)) {
    const safeOrder = allowedOrder.includes(order) ? order : 'desc';
    query.orderBy(`reports.${sort_by}`, safeOrder);
  } else {
    query.orderBy('reports.created_at', 'desc');
  }

  // LIMIT
  const parsedLimit = parseInt(limit, 10);
  if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100) {
    query.limit(parsedLimit);
  }

  // OFFSET
  const parsedOffset = parseInt(offset, 10);
  if (!isNaN(parsedOffset) && parsedOffset >= 0) {
    query.offset(parsedOffset);
  }

  return query;
};
