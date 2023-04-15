import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import {
  SubscriptionRepository,
  subscriptionRepositoryProvider,
} from './subscription.repository.js';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [subscriptionRepositoryProvider],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
