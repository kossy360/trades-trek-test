import { Module } from '@nestjs/common';
import { userRepositoryProvider } from './user.repository.js';
import { DatabaseModule } from '../database/database.module.js';
import { UserService } from './services/user.service.js';
import { SubscriptionModule } from '../subscription/subscription.module.js';

@Module({
  imports: [DatabaseModule, SubscriptionModule],
  controllers: [],
  providers: [userRepositoryProvider, UserService],
})
export class UserModule {}
