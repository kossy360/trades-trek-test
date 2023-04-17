import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { successResponse } from '../../common/response/success-response.js';
import { Protected } from '../common/decorators/protected.js';
import { SubscriptionService } from './services/subscription.service.js';

@Controller('subscription')
@Protected()
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async subscriptions() {
    const subscriptions = await this.subscriptionService.getSubscriptions();

    return successResponse('Subscriptions', subscriptions);
  }
}
