import { User } from '../entities/user.entity.js';

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserProfile {
  user: User;
}
