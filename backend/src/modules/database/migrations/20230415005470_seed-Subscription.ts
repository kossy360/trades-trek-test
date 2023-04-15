import { Knex } from 'knex';

const subscriptions = [
  {
    id: 'free_trial',
    name: 'Free Trial',
    description: '14 days free trial',
    price: 0,
    duration: 14,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: '1 month premium',
    price: 10000,
    duration: 30,
  },
];

export async function up(knex: Knex): Promise<void> {
  await knex('Subscription').insert(subscriptions);
}

export async function down(knex: Knex): Promise<void> {
  await knex('Subscription').whereIn(
    'id',
    subscriptions.map((s) => s.id),
  );
}
