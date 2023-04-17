import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { SubscriptionRepository } from './subscription.repository.js';
import { Subscription } from './entities/subscription.entity.js';
import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionService } from './services/subscription.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionController],
  providers: [provideRepository(Subscription, SubscriptionRepository), SubscriptionService],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
