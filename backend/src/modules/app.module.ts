import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { DatabaseModule } from './database/database.module.js';
import { SubscriptionModule } from './subscription/subscription.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CommonModule } from './common/common.module.js';
import { PaymentModule } from './payment/payment.module.js';
import { ScheduleModule } from '@nestjs/schedule';

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
