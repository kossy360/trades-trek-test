import { IBaseResponse } from './base-response';

export interface ISubscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface IGetSubscriptionsResponse extends IBaseResponse {
  data: ISubscription[];
}
