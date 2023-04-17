import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQ_CTX } from '../../../config/constants.js';
import { IAppRequest } from '../../auth/types/auth.type.js';

export const ReqUser: () => ParameterDecorator = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as IAppRequest;

    const context = request[REQ_CTX];

    return context.user;
  },
);
