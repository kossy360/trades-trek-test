import { Injectable, NotFoundException } from '@nestjs/common';
import { addDays, addMinutes, startOfToday } from 'date-fns';
import { In, MoreThanOrEqual } from 'typeorm';
import { Transaction } from '../../payment/entities/transaction.entity.js';
import { PaymentService } from '../../payment/services/payment.service.js';
import { ETransactionStatus, ETransactionType } from '../../payment/types/transaction.type.js';
import { Subscription } from '../../subscription/entities/subscription.entity.js';
import { SubscriptionRepository } from '../../subscription/subscription.repository.js';
import { UserSubscription } from '../entities/user-subscription.entity.js';
import { User } from '../entities/user.entity.js';
import { EUserSubscriptionStatus, IUserSubscriptionFull } from '../types/user-subscription.type.js';
import { UserRepository, UserSubscriptionRepository } from '../user.repository.js';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class UserSubscriptionService {
  constructor(
    private rUser: UserRepository,
    private rSubscription: SubscriptionRepository,
    private paymentService: PaymentService,
    private rUserSubscription: UserSubscriptionRepository,
  ) {}

  async initSubscription(user: User, subscriptionId: string): Promise<string | null> {
    const userSubscription = await this.rUserSubscription.findOneByOrFail({ userId: user.id });
    const [subscription, activeSub] = await Promise.all([
      this.rSubscription.findOne({ where: { id: subscriptionId } }),
      this.rSubscription.findOneByOrFail({ id: userSubscription?.subscriptionId }),
    ]);

    if (!subscription || subscription.id === 'free_trial') {
      throw new NotFoundException('Subscription not found');
    }

    if (
      activeSub.id === subscription.id &&
      userSubscription.status !== EUserSubscriptionStatus.expired
    ) {
      userSubscription.status = EUserSubscriptionStatus.active;

      await this.rUserSubscription.save(userSubscription);

      return null;
    }

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
        startDate: new Date(subData.startDate),
        endDate: addDays(new Date(subData.startDate), subData.duration),
      }),
    );
  }

  async cancel(userId: string): Promise<UserSubscription> {
    const userSub = await this.rUserSubscription.findOneByOrFail({ userId });

    userSub.status = EUserSubscriptionStatus.canceled;

    await this.rUserSubscription.save(userSub);

    return userSub;
  }

  async getSubscription(userId: string): Promise<IUserSubscriptionFull> {
    const userSub = await this.rUserSubscription.findOneByOrFail({ userId });
    const subscription = await this.rSubscription.findOneByOrFail({ id: userSub.subscriptionId });

    return { ...userSub, subscription };
  }

  @Interval(1000 * 60 * 5)
  async checkSubscriptions() {
    const userSubs = await this.rUserSubscription.find({
      where: { endDate: MoreThanOrEqual(addMinutes(new Date(), 5)) },
    });
    const subs = await this.rSubscription.find().then((res) =>
      res.reduce((acc, curr) => {
        acc[curr.id] = curr;

        return acc;
      }, {} as Record<string, Subscription>),
    );
    const users = await this.rUser
      .find({ where: { id: In(userSubs.map((us) => us.userId)) } })
      .then((res) =>
        res.reduce((acc, curr) => {
          acc[curr.id] = curr;

          return acc;
        }, {} as Record<string, User>),
      );

    for (const userSub of userSubs) {
      const sub = subs[userSub.subscriptionId];
      const user = users[userSub.userId];

      if (userSub.status === EUserSubscriptionStatus.active) {
        const tx = await this.paymentService.billUser(
          user,
          sub.price,
          ETransactionType.subscription,
          { subscriptionId: sub.id, startDate: startOfToday(), duration: sub.duration },
          `${sub.name} payment (renewal)`,
        );

        if (tx?.status === ETransactionStatus.completed) {
          userSub.startDate = startOfToday();
          userSub.endDate = addDays(startOfToday(), sub.duration);
        } else {
          userSub.status = EUserSubscriptionStatus.expired;
        }
      }
    }

    await this.rUserSubscription.save(userSubs);
  }
}
