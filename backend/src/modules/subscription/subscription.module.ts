import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { SubscriptionRepository } from './subscription.repository.js';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...provideRepository(SubscriptionRepository)],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
