import { Repository } from 'typeorm';
import { PaymentAuth } from './entities/payment-auth.entity.js';
import { Transaction } from './entities/transaction.entity.js';

export class TransactionRepository extends Repository<Transaction> {}

export class PaymentAuthRepository extends Repository<PaymentAuth> {}
