import { IBaseResponse } from './base-response';
import { ISubscription } from './subscription';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserProfile {
  user: IUser;
}

export enum EUserSubscriptionStatus {
  active = 'active',
  canceled = 'canceled',
  expired = 'expired',
}

export interface IUserSubscription {
  subscription?: ISubscription;
  subscriptionId: string;
  status: EUserSubscriptionStatus;
  startDate: string;
  endDate: string;
}

export interface IUserAuthResponse extends IBaseResponse {
  data: { user: IUser; token: string };
}

export interface IUserProfileResponse extends IBaseResponse {
  data: IUserProfile;
}
export interface IUserSubscriptionResponse extends IBaseResponse {
  data: IUserSubscription;
}

export interface IUserSubscribeResponse extends IBaseResponse {
  data: { url: string | null };
}
