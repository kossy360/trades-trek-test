import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepository } from '../database/utils/provide-repository.js';
import { UserModule } from '../user/user.module.js';
import { PaymentAuth } from './entities/payment-auth.entity.js';
import { Transaction } from './entities/transaction.entity.js';
import { PaymentController } from './payment.controller.js';
import { PaymentAuthRepository, TransactionRepository } from './payment.repository.js';
import { PaymentService } from './services/payment.service.js';
import { PaystackService } from './services/paystack.service.js';
import { VerifyPaymentService } from './services/verify-payment.service.js';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [PaymentController],
  providers: [
    provideRepository(Transaction, TransactionRepository),
    provideRepository(PaymentAuth, PaymentAuthRepository),
    PaystackService,
    PaymentService,
    VerifyPaymentService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
