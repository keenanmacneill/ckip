exports.up = function (knex) {
  return knex.schema.createTable('reports', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('summary').notNullable();
    table.string('mgrs').notNullable();
    table.string('lat_long').notNullable();
    table.string('created_at').defaultTo(knex.fn.now());
    table.text('recommendations').notNullable();
    table.string('priority').notNullable().defaultTo('info only');
    table.string('classification').notNullable().defaultTo('confidential');

    table.integer('submitted_by').notNullable().unsigned();
    table
      .foreign('submitted_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reports');
};
