import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../subscription/subscription.repository.js';
import { UserRepository } from '../user.repository.js';

@Injectable()
export class UserService {
  constructor(private rUser: UserRepository, private rSubscription: SubscriptionRepository) {}
}
