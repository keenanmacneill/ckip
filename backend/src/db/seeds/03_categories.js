exports.seed = async function (knex) {
  await knex('categories').del();
  await knex('categories').insert([
    { category: 'key_leader' },
    { category: 'infrastructure' },
    { category: 'population' },
    { category: 'governance' },
    { category: 'economy' },
    { category: 'culture' },
    { category: 'religion' },
    { category: 'security' },
    { category: 'public_health' },
    { category: 'education' },
    { category: 'information' },
  ]);
};
