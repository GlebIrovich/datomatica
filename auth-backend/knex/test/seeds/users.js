const uuidv4 = require('uuid/v4');

exports.seed = knex => knex('users')
  .del()
  .then(() => knex('users').insert([
    {
      id: uuidv4(),
      username: 'Test',
      name: 'test',
      last_name: 'test',
      password: '$2a$05$qRYmul1lOw.JwE.Lu/tpRuuowABrWE3EJm/RRtLwrcu8u5WvHwUvu',
      email: 'test@test.com',
    },
  ]));
