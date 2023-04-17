import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { UserSubscription } from './entities/user-subscription.entity.js';

export class UserRepository extends Repository<User> {}

export class UserSubscriptionRepository extends Repository<UserSubscription> {}
