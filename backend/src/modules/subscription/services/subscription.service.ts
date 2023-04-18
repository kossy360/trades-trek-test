import { Injectable } from '@nestjs/common';
import { Subscription } from '../entities/subscription.entity.js';
import { SubscriptionRepository } from '../subscription.repository.js';

@Injectable()
export class SubscriptionService {
  constructor(private rSubscription: SubscriptionRepository) {}

  async getSubscriptions(): Promise<Subscription[]> {
    const subscriptions = await this.rSubscription.find({
      order: { price: 'asc' },
    });

    return subscriptions;
  }
}
