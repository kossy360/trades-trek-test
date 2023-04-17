import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { SubscriptionModule } from '../subscription/subscription.module.js';
import { UserService } from './services/user.service.js';
import { UserRepository, UserSubscriptionRepository } from './user.repository.js';

@Module({
  imports: [DatabaseModule, SubscriptionModule],
  controllers: [],
  providers: [...provideRepository(UserRepository, UserSubscriptionRepository), UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
