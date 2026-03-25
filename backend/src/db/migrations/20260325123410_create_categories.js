exports.up = function (knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id');
    table.string('type').notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
