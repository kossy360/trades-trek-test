import { Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { successResponse } from '../../common/response/success-response.js';
import { Protected } from '../common/decorators/protected.js';
import { VerifyPaymentService } from './services/verify-payment.service.js';
import { ETransactionStatus } from './types/transaction.type.js';

@Controller('payment')
@Protected()
export class PaymentController {
  constructor(private verifyPaymentService: VerifyPaymentService) {}

  @Patch(':transactionId/verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Param('transactionId') transactionId: string) {
    const transaction = await this.verifyPaymentService.verify(transactionId);

    return successResponse(
      transaction.status === ETransactionStatus.completed
        ? 'Transaction Verified'
        : 'Transaction Failed',
      transaction,
    );
  }
}
