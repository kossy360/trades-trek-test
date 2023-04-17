import { Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { successResponse } from '../../common/response/success-response.js';
import { Protected } from '../common/decorators/protected.js';
import { ReqUser } from '../common/decorators/req-user.js';
import { User } from './entities/user.entity.js';
import { UserSubscriptionService } from './services/user-subscription.service.js';
import { UserService } from './services/user.service.js';

@Controller('user')
@Protected()
export class UserController {
  constructor(
    private userService: UserService,
    private userSubscriptionService: UserSubscriptionService,
  ) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async profile(@ReqUser() user: User) {
    const profile = await this.userService.getProfile(user.id);

    return successResponse('Profile', profile);
  }

  @Get('subscription')
  @HttpCode(HttpStatus.OK)
  async subscription(@ReqUser() user: User) {
    const userSub = await this.userSubscriptionService.getSubscription(user.id);

    return successResponse('Profile', userSub);
  }

  @Patch('subscription/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelSubscription(@ReqUser() user: User) {
    const userSub = await this.userSubscriptionService.cancel(user.id);

    return successResponse('Subscribed', userSub);
  }

  @Patch('subscription/:subscriptionId/subscribe')
  @HttpCode(HttpStatus.OK)
  async subscribe(@ReqUser() user: User, @Param('subscriptionId') subscriptionId: string) {
    const url = await this.userSubscriptionService.initSubscription(user, subscriptionId);

    return successResponse('Subscribed', { url });
  }
}
