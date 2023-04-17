import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { addDays, startOfToday } from 'date-fns';
import { SubscriptionRepository } from '../../subscription/subscription.repository.js';
import { User } from '../entities/user.entity.js';
import { UserRepository, UserSubscriptionRepository } from '../user.repository.js';
import { ICreateUserDTO, IUserProfile } from '../types/user.type.js';
import { EUserSubscriptionStatus } from '../types/user-subscription.type.js';

@Injectable()
export class UserService {
  constructor(
    private rUser: UserRepository,
    private rSubscription: SubscriptionRepository,
    private rUserSubscription: UserSubscriptionRepository,
  ) {}

  async createUser(payload: ICreateUserDTO): Promise<User> {
    if (await this.rUser.exist({ where: { email: payload.email } })) {
      throw new ConflictException('User with email already exists');
    }

    const subscription = await this.rSubscription.findOneOrFail({ where: { id: 'free_trial' } });
    const user = await this.rUser.save(
      this.rUser.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      }),
    );
    await this.rUserSubscription.save(
      this.rUserSubscription.create({
        userId: user.id,
        subscriptionId: subscription.id,
        status: EUserSubscriptionStatus.active,
        startDate: subscription ? startOfToday() : null,
        endDate: subscription ? addDays(startOfToday(), subscription.duration) : null,
      }),
    );

    return user;
  }

  async getProfile(userId: string): Promise<IUserProfile> {
    const user = await this.rUser.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    return { user };
  }
}
