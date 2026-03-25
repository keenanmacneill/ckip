exports.up = function (knex) {
  return knex
    .raw(
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_type') THEN
          CREATE TYPE category_type AS ENUM('key_leader', 'infrastructure', 'population', 'terrain');
        END IF;
      END $$;`,
    )
    .then(() => {
      return knex.schema.createTable('categories', table => {
        table.increments('id');
        table
          .enu('type', null, {
            useNative: true,
            existingType: true,
            enumName: 'category_type',
          })
          .defaultTo(null);
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories').then(() => {
    return knex.raw('DROP TYPE IF EXISTS category_type');
  });
};
