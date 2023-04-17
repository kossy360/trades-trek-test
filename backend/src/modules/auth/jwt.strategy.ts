import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REQ_CTX } from '../../config/constants.js';
import { UserRepository } from '../user/user.repository.js';
import { IAppRequest, IJWTPayload, IRequestUser } from './types/auth.type.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private rUser: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: IAppRequest, payload: IJWTPayload): Promise<IRequestUser | null> {
    const user = await this.rUser.findOne({ where: { id: payload.sub } });

    if (!user) return null;

    const ctx: IRequestUser = {
      jwtPayload: payload,
      user,
    };
    req[REQ_CTX] = ctx;

    return ctx;
  }
}
