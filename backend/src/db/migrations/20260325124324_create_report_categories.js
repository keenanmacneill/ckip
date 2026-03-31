exports.up = function (knex) {
  return knex.schema.createTable('report_categories', table => {
    table.increments('id');

    table.integer('report_id').unsigned().notNullable();
    table
      .foreign('report_id')
      .references('id')
      .inTable('reports')
      .onDelete('CASCADE');

    table.integer('category_id').unsigned().notNullable();
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');

    table.unique(['report_id', 'category_id']);
    table.index('report_id', 'idx_report_categories_report_id');
    table.index('category_id', 'idx_report_categories_category_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('report_categories');
};
