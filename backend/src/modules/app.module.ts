import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module.js';
import { CommonModule } from './common/common.module.js';
import { DatabaseModule } from './database/database.module.js';
import { PaymentModule } from './payment/payment.module.js';
import { SubscriptionModule } from './subscription/subscription.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CommonModule,
    DatabaseModule,
    SubscriptionModule,
    UserModule,
    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
