exports.up = function (knex) {
  return knex.schema.createTable('reports', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('summary').notNullable();
    table.string('mgrs').notNullable();
    table.string('lat_long').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.text('recommendations').notNullable();
    table.string('priority').notNullable().defaultTo('routine');
    table.string('classification').notNullable().defaultTo('confidential');

    table.integer('submitted_by').unsigned().nullable();
    table
      .foreign('submitted_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    table.index('submitted_by', 'idx_reports_submitted_by');
    table.index('priority', 'idx_reports_priority');
    table.index('classification', 'idx_reports_classification');
    table.index('created_at', 'idx_reports_created_at');
    table.index(['priority', 'created_at'], 'idx_reports_priority_created_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reports');
};
