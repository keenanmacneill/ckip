exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { id: 1, type: 'key_leader' },
    { id: 2, type: 'infrastructure' },
    { id: 3, type: 'population' },
    { id: 4, type: 'terrain' },
  ]);
};
