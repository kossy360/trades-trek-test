import { Subscription } from '../../subscription/entities/subscription.entity.js';
import { UserSubscription } from '../entities/user-subscription.entity.js';

export enum EUserSubscriptionStatus {
  active = 'active',
  canceled = 'canceled',
  expired = 'expired',
}

export interface IUserSubscriptionFull extends UserSubscription {
  subscription: Subscription;
}
