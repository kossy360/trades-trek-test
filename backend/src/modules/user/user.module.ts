import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { PaymentModule } from '../payment/payment.module.js';
import { SubscriptionModule } from '../subscription/subscription.module.js';
import { UserSubscription } from './entities/user-subscription.entity.js';
import { User } from './entities/user.entity.js';
import { UserSubscriptionService } from './services/user-subscription.service.js';
import { UserService } from './services/user.service.js';
import { UserController } from './user.controller.js';
import { UserRepository, UserSubscriptionRepository } from './user.repository.js';

@Module({
  imports: [DatabaseModule, SubscriptionModule, PaymentModule],
  controllers: [UserController],
  providers: [
    provideRepository(User, UserRepository),
    provideRepository(UserSubscription, UserSubscriptionRepository),
    UserService,
    UserSubscriptionService,
  ],
  exports: [UserRepository, UserService, UserSubscriptionService],
})
export class UserModule {}
