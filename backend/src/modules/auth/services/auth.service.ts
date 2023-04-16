import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { User } from '../../user/entities/user.entity.js';
import { UserRepository } from '../../user/user.repository.js';
import { ILoginDTO, ISignUpDTO } from '../auth.type.js';
import { UserService } from '../../user/services/user.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private rUser: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(payload: ISignUpDTO): Promise<[User, string]> {
    const user = await this.userService.createUser({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 8),
    });
    const token = this.jwtService.sign({}, { subject: user.id });

    return [user, token];
  }

  async login(payload: ILoginDTO): Promise<[User, string]> {
    const user = await this.rUser.findOne({ where: { email: payload.email } });

    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      throw new UnauthorizedException('email or password incorrect');
    }

    const token = this.jwtService.sign({}, { subject: user.id });

    return [user, token];
  }
}
