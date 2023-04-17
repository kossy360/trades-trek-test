export interface IPaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface IPaystackInitTransaction {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface IPaystackVerifyTransaction {
  id: number;
  status: string;
  reference: string;
  amount: number;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    card_type: string;
    reusable: boolean;
    signature: string;
  };
}

export interface IPaystackChargeAuth extends IPaystackVerifyTransaction {}
