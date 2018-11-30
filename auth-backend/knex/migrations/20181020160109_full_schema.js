exports.up = knex => knex.schema
  .createTable('users', (users) => {
    users
      .uuid('id')
      .notNullable()
      .primary();
    users.timestamp('created_at').defaultTo(knex.fn.now());
    users.string('username').notNull();
    users.string('password').notNull();
    users.string('name').notNull();
    users.string('last_name').notNull();
    users.string('email').notNull();
  })
  .createTable('user_tokens', (userTokens) => {
    userTokens
      .uuid('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .primary();
    userTokens.string('consumer_secret').nullable();
    userTokens.string('consumer_key').nullable();
    userTokens.string('url').nullable();
    userTokens.timestamp('sync_date').nullable();
  })
  .createTable('transactions', (transactions) => {
    transactions.increments('local_id').primary();
    transactions.string('order_key');
    transactions.integer('customer_id');
    transactions.timestamp('date_created');
    transactions.integer('total');
    transactions
      .uuid('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
  })
  .createTable('user_operation_status', (userOperationStatus) => {
    userOperationStatus
      .uuid('user_id')
      .unsigned()
      .primary()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    userOperationStatus.string('status');
    userOperationStatus.timestamp('updated_at');
  })
  .createTable('maxes_model', (maxesModel) => {
    maxesModel.increments('local_id').primary();
    maxesModel.integer('TotalTransactions');
    maxesModel.integer('MaxBill');
    maxesModel
      .uuid('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
  });
exports.down = knex => knex.schema
  .dropTableIfExists('maxes_model')
  .dropTableIfExists('transactions')
  .dropTableIfExists('user_operation_status')
  .dropTableIfExists('user_tokens')
  .dropTableIfExists('users');
