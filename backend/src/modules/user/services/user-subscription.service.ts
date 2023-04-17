import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository, UserSubscriptionRepository } from '../user.repository.js';
import { SubscriptionRepository } from '../../subscription/subscription.repository.js';
import { User } from '../entities/user.entity.js';
import { PaymentService } from '../../payment/services/payment.service.js';
import { ETransactionStatus, ETransactionType } from '../../payment/types/transaction.type.js';
import { addDays, startOfToday } from 'date-fns';
import { Transaction } from '../../payment/entities/transaction.entity.js';

@Injectable()
export class UserSubscriptionService {
  constructor(
    private rUser: UserRepository,
    private rSubscription: SubscriptionRepository,
    private paymentService: PaymentService,
    private rUserSubscription: UserSubscriptionRepository,
  ) {}

  async initSubscription(user: User, subscriptionId: string): Promise<string> {
    const subscription = await this.rSubscription.findOne({ where: { id: subscriptionId } });

    if (!subscription) throw new NotFoundException('Subscription not found');

    const [, url] = await this.paymentService.initPayment(
      user,
      subscription.price,
      ETransactionType.subscription,
      { subscriptionId, startDate: startOfToday(), duration: subscription.duration },
      `${subscription.name} payment`,
    );

    return url;
  }

  async validate(tx: Transaction): Promise<void> {
    if (tx.status !== ETransactionStatus.completed) return;

    const subData = tx.data as { subscriptionId: string; startDate: string; duration: number };

    await this.rUserSubscription.save(
      this.rUserSubscription.create({
        userId: tx.userId,
        subscriptionId: subData.subscriptionId,
        nextSubscriptionId: subData.subscriptionId,
        subscriptionStartDate: new Date(subData.startDate),
        subscriptionEndDate: addDays(new Date(subData.startDate), subData.duration),
      }),
    );
  }
}
