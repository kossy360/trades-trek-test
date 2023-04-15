import knex from 'knex';

export async function up(knex: knex.Knex): Promise<void> {
  await knex.schema.createTable('Subscription', (table) => {
    table.string('id', 50).primary({ constraintName: 'SUBSCRIPTION_PKEY' });
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.float('price', undefined, 2).notNullable().defaultTo(0);
    table.integer('duration').notNullable();
  });
}

export async function down(knex: knex.Knex): Promise<void> {
  await knex.schema.dropTable('Subscription');
}
