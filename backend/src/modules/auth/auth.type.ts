import { Request } from 'express';
import { REQ_CTX } from '../../config/constants.js';
import { User } from '../user/entities/user.entity.js';
import { ICreateUserDTO } from '../user/user.type.js';

export interface IJWTPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  anonymousUser?: boolean;
  [k: string]: unknown;
}

export interface IRequestUser {
  jwtPayload: IJWTPayload;
  user: User;
}

export interface IAppRequest extends Request {
  [REQ_CTX]: IRequestUser;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ISignUpDTO extends ICreateUserDTO {}
