import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity.js';

export class SubscriptionRepository extends Repository<Subscription> {}
