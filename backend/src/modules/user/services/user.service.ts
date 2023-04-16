import { Injectable } from '@nestjs/common';
import { addDays, startOfToday } from 'date-fns';
import { SubscriptionRepository } from '../../subscription/subscription.repository.js';
import { User } from '../entities/user.entity.js';
import { UserRepository } from '../user.repository.js';
import { ICreateUserDTO } from '../user.type.js';

@Injectable()
export class UserService {
  constructor(private rUser: UserRepository, private rSubscription: SubscriptionRepository) {}

  async createUser(payload: ICreateUserDTO): Promise<User> {
    const subscription = await this.rSubscription.findOne({ where: { id: 'free_trial' } });
    const user = await this.rUser.save(
      this.rUser.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        subscriptionId: subscription?.id,
        subscriptionStartDate: subscription ? startOfToday() : null,
        subscriptionEndDate: subscription ? addDays(startOfToday(), subscription.duration) : null,
      }),
    );

    return user;
  }
}
