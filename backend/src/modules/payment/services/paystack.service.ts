import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import got, { Got } from 'got';
import {
  IPaystackInitTransaction,
  IPaystackResponse,
  IPaystackVerifyTransaction,
} from '../types/paystack.type.js';

@Injectable()
export class PaystackService {
  private client: Got;

  constructor() {
    this.client = got.extend({
      prefixUrl: 'https://api.paystack.co',
      headers: {
        authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'content-type': 'application/json',
      },
    });
  }

  async init(ref: string, email: string, amount: number): Promise<IPaystackInitTransaction> {
    const res = await this.client
      .post('transaction/initialize', {
        json: {
          reference: ref,
          email,
          amount,
          callback_url: `${process.env.FRONTEND_URL}/subscription/verify-payment`,
        },
        throwHttpErrors: false,
      })
      .json<IPaystackResponse<IPaystackInitTransaction>>();

    if (!res.status) {
      throw new ServiceUnavailableException('Unable to start payment');
    }

    return res.data;
  }

  async verify(ref: string): Promise<IPaystackVerifyTransaction> {
    const res = await this.client
      .get(`transaction/verify/${ref}`)
      .json<IPaystackResponse<IPaystackVerifyTransaction>>();

    if (!res.status) {
      throw new ServiceUnavailableException('Unable to verify payment');
    }

    return res.data;
  }

  async chargeAuth(
    ref: string,
    code: string,
    email: string,
    amount: number,
  ): Promise<IPaystackVerifyTransaction | null> {
    const res = await this.client
      .get('transaction/charge_authorization', {
        json: { reference: ref, authorization_code: code, email, amount },
      })
      .json<IPaystackResponse<IPaystackVerifyTransaction>>();

    if (!res.status) {
      return null;
    }

    return res.data;
  }
}
