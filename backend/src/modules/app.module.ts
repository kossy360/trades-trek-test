import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';
import { SubscriptionModule } from './subscription/subscription.module.js';

@Module({
  imports: [DatabaseModule, SubscriptionModule, UserModule],
})
export class AppModule {}
