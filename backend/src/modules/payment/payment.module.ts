import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { PaymentAuthRepository, TransactionRepository } from './payment.repository.js';
import { PaystackService } from './services/paystack.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...provideRepository(TransactionRepository, PaymentAuthRepository), PaystackService],
  exports: [],
})
export class PaymentModule {}
