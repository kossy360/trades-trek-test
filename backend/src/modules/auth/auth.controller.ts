import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { successResponse } from '../../common/response/success-response.js';
import { JoiBody } from '../common/decorators/joi-body.decorator.js';
import { ILoginDTO, ISignUpDTO } from './auth.type.js';
import { vLogin, vSignup } from './auth.v-schema.js';
import { AuthService } from './services/auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@JoiBody(vSignup) payload: ISignUpDTO) {
    const [user, token] = await this.authService.signup(payload);

    return successResponse('Signup success', { user, token });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@JoiBody(vLogin) payload: ILoginDTO) {
    const [user, token] = await this.authService.login(payload);

    return successResponse('Login success', { user, token });
  }
}
