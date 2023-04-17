import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscriptionService } from '../../user/services/user-subscription.service.js';
import { Transaction } from '../entities/transaction.entity.js';
import { PaymentAuthRepository, TransactionRepository } from '../payment.repository.js';
import { ETransactionStatus, ETransactionType } from '../types/transaction.type.js';
import { PaystackService } from './paystack.service.js';

@Injectable()
export class VerifyPaymentService {
  constructor(
    private paystackService: PaystackService,
    private userSubscriptionService: UserSubscriptionService,
    private rTransaction: TransactionRepository,
    private rPaymentAuth: PaymentAuthRepository,
  ) {}

  async verify(txId: string): Promise<Transaction> {
    const tx = await this.rTransaction.findOneBy({ id: txId });

    if (!tx) throw new NotFoundException('Transaction not found');

    const paystackRes = await this.paystackService.verify(tx.id);

    if (paystackRes.status === 'success') {
      const code = paystackRes.authorization.authorization_code;
      const card = `${paystackRes.authorization.bin}****${paystackRes.authorization.last4}`;
      const expiresAt = new Date(
        parseInt(paystackRes.authorization.exp_year),
        parseInt(paystackRes.authorization.exp_month),
      );
      tx.status = ETransactionStatus.completed;
      tx.card = card;

      await this.rTransaction.save(tx);

      if (await this.rPaymentAuth.exist({ where: { userId: tx.userId } })) {
        await this.rPaymentAuth.update({ userId: tx.userId }, { code, card, expiresAt });
      } else {
        await this.rPaymentAuth.save(
          this.rPaymentAuth.create({
            userId: tx.userId,
            code,
            card,
            expiresAt,
          }),
        );
      }
    }

    switch (tx.type) {
      case ETransactionType.subscription:
        await this.userSubscriptionService.validate(tx);
        break;
      default:
        break;
    }

    return tx;
  }
}
