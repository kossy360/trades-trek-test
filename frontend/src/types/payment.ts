import { IBaseResponse } from './base-response';

export enum ETransactionStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

export interface ITransaction {
  id: string;
  userId: string;
  status: ETransactionStatus;
  amount: number;
}

export interface IVerifyPaymentResponse extends IBaseResponse {
  data: ITransaction;
}
