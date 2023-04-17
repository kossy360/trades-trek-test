import knex from 'knex';

export async function up(knex: knex.Knex): Promise<void> {
  await knex.schema.createTable('PaymentAuth', (table) => {
    table
      .string('userId', 50)
      .nullable()
      .primary({ constraintName: 'PAYMENT_AUTH_PKEY' })
      .references('id')
      .inTable('User')
      .withKeyName('PAYMENT_AUTH_USER_ID_FKEY');
    table.string('code', 50).notNullable();
    table.string('card', 20).notNullable();
    table.timestamp('expiresAt', { precision: 3 }).notNullable();
  });
}

export async function down(knex: knex.Knex): Promise<void> {
  await knex.schema.dropTable('PaymentAuth');
}
