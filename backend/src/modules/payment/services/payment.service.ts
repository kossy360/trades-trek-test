import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity.js';
import { Transaction } from '../entities/transaction.entity.js';
import { PaymentAuthRepository, TransactionRepository } from '../payment.repository.js';
import { ETransactionStatus } from '../types/transaction.type.js';
import { PaystackService } from './paystack.service.js';

@Injectable()
export class PaymentService {
  constructor(
    private paystackService: PaystackService,
    private rTransaction: TransactionRepository,
    private rPaymentAuth: PaymentAuthRepository,
  ) {}

  async initPayment(
    user: User,
    amount: number,
    type: string,
    data: unknown,
    description: string,
  ): Promise<[Transaction, string]> {
    const tx = await this.rTransaction.save(
      this.rTransaction.create({
        userId: user.id,
        type,
        data,
        status: ETransactionStatus.pending,
        description,
        amount: amount * 100,
      }),
    );
    const paystackRes = await this.paystackService.init(tx.id, user.email, tx.amount);

    return [tx, paystackRes.authorization_url];
  }

  async billUser(
    user: User,
    amount: number,
    type: string,
    data: unknown,
    description: string,
  ): Promise<Transaction | null> {
    const auth = await this.rPaymentAuth.findOneBy({ userId: user.id });

    if (!auth) return null;

    const tx = await this.rTransaction.save(
      this.rTransaction.create({
        userId: user.id,
        card: auth.card,
        type,
        data,
        status: ETransactionStatus.pending,
        description,
        amount: amount * 100,
      }),
    );
    const paystackRes = await this.paystackService.chargeAuth(
      tx.id,
      auth.code,
      user.email,
      tx.amount,
    );
    tx.status =
      paystackRes?.status === 'success' ? ETransactionStatus.completed : ETransactionStatus.failed;

    await this.rTransaction.save(tx);

    return tx;
  }
}
