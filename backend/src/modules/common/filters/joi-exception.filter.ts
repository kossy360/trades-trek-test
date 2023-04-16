import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import Joi from 'joi';

@Catch(Joi.ValidationError)
export class JoiExceptionFilter implements ExceptionFilter {
  catch(error: Joi.ValidationError, host: ArgumentsHost) {
    const errors = error.details.map((e) => ({
      ...e,
      message: e.message.replace(/"(\w+)"/g, '$1'),
    }));
    // const details = error.details.reduce((acc, err) => lodash.set(acc, err.path, err.message), {});
    const err = new BadRequestException(errors[0]?.message ?? 'Validation failed');

    host.switchToHttp().getResponse().status(err.getStatus()).json(err.getResponse());
  }
}
