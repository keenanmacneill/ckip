exports.up = function (knex) {
  return knex.schema.createTable('reports', table => {
    table.increments('id');
    table.string('title').notNullable().unique();
    table.text('summary').notNullable().unique();
    table.string('MGRS').notNullable();
    table.string('created_at').defaultTo(knex.fn.now());

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
