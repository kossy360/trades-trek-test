import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATA_SOURCE } from '../../config/constants.js';
import { Subscription } from './entities/subscription.entity.js';

export class SubscriptionRepository extends Repository<Subscription> {}

export const subscriptionRepositoryProvider: Provider = {
  provide: SubscriptionRepository,
  useFactory: (source: DataSource) => source.getRepository(Subscription),
  inject: [DATA_SOURCE],
};
