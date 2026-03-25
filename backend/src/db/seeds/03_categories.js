exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { id: 1, type: 'key_leader' },
    { id: 2, type: 'infrastructure' },
    { id: 3, type: 'population' },
    { id: 4, type: 'governance' },
    { id: 5, type: 'economy' },
    { id: 6, type: 'culture' },
    { id: 7, type: 'religion' },
    { id: 8, type: 'security' },
    { id: 9, type: 'public_health' },
    { id: 10, type: 'education' },
    { id: 11, type: 'information' },
  ]);
};
