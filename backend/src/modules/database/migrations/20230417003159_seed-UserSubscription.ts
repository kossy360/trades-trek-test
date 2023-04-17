import knex from 'knex';

export async function up(knex: knex.Knex): Promise<void> {
  await knex.schema.createTable('UserSubscription', (table) => {
    table
      .string('userId', 50)
      .nullable()
      .references('id')
      .inTable('User')
      .withKeyName('USER_SUBSCRIPTION_USER_ID_FKEY');
    table
      .string('subscriptionId', 50)
      .notNullable()
      .references('id')
      .inTable('Subscription')
      .withKeyName('USER_SUBSCRIPTION_SUBSCRIPTION_ID_FKEY');
    table.string('status', 20).notNullable();
    table
      .string('nextSubscriptionId', 50)
      .nullable()
      .references('id')
      .inTable('Subscription')
      .withKeyName('USER_SUBSCRIPTION_NEXT_SUBSCRIPTION_ID_FKEY');
    table.timestamp('startDate', { precision: 3 }).nullable();
    table.timestamp('endDate', { precision: 3 }).nullable();
  });
}

export async function down(knex: knex.Knex): Promise<void> {
  await knex.schema.dropTable('UserSubscription');
}
