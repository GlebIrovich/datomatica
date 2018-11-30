// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
  },

  production: {
    client: 'pg',
    ssl: true,
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/seeds`,
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'test',
      user: 'gleb',
      password: '',
    },
    migrations: {
      directory: `${__dirname}/knex/migrations`,
    },
    seeds: {
      directory: `${__dirname}/knex/test/seeds`,
    },
  },
};
