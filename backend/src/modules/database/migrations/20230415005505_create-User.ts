import knex from 'knex';

export async function up(knex: knex.Knex): Promise<void> {
  await knex.schema.createTable('User', (table) => {
    table.string('id', 50).primary({ constraintName: 'USER_PKEY' });
    table.string('firstName', 100).notNullable();
    table.string('lastName', 100).notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table
      .string('subscriptionId', 50)
      .nullable()
      .references('id')
      .inTable('Subscription')
      .withKeyName('USER_SUBSCRIPTION_ID_FKEY');
    table.timestamp('subscriptionStartDate', { precision: 3 }).nullable();
    table.timestamp('subscriptionEndDate', { precision: 3 }).nullable();
  });
}

export async function down(knex: knex.Knex): Promise<void> {
  await knex.schema.dropTable('User');
}
