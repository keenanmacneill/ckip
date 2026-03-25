exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { id: 1, category: 'key_leader' },
    { id: 2, category: 'infrastructure' },
    { id: 3, category: 'population' },
    { id: 4, category: 'governance' },
    { id: 5, category: 'economy' },
    { id: 6, category: 'culture' },
    { id: 7, category: 'religion' },
    { id: 8, category: 'security' },
    { id: 9, category: 'public_health' },
    { id: 10, category: 'education' },
    { id: 11, category: 'information' },
  ]);
};
