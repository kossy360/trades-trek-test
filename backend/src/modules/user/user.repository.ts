import { Repository } from 'typeorm';
import { UserSubscription } from './entities/user-subscription.entity.js';
import { User } from './entities/user.entity.js';

export class UserRepository extends Repository<User> {}

export class UserSubscriptionRepository extends Repository<UserSubscription> {}
