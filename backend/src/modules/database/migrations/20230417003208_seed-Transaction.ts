import knex from 'knex';

export async function up(knex: knex.Knex): Promise<void> {
  await knex.schema.createTable('Transaction', (table) => {
    table.string('id', 50).primary({ constraintName: 'TRANSACTION_PKEY' });
    table
      .string('userId', 50)
      .nullable()
      .references('id')
      .inTable('User')
      .withKeyName('TRANSACTION_USER_ID_FKEY');
    table.jsonb('data').nullable();
    table.string('type', 20).notNullable();
    table.string('status', 20).notNullable();
    table.string('card', 20).nullable();
    table.text('description').notNullable();
    table.bigint('amount').notNullable();
    table.timestamp('createdAt', { precision: 3 }).notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: knex.Knex): Promise<void> {
  await knex.schema.dropTable('Transaction');
}
