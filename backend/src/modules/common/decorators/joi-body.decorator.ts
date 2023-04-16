import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import Joi from 'joi';
import { JoiPipe, joiPipe } from '../pipes/joi.pipe.js';

interface IJoiBodyOptions {
  schema: Joi.ObjectSchema;
  options?: Joi.ValidationOptions;
}

export const JoiBody = createParamDecorator(
  async (
    schemaOrOptions: IJoiBodyOptions | Joi.ObjectSchema | undefined,
    ctx: ExecutionContext,
  ) => {
    let { body = {} } = ctx.switchToHttp().getRequest() as Request;

    if (schemaOrOptions) {
      let pipe: JoiPipe | null = null;

      if (Joi.isSchema(schemaOrOptions)) {
        pipe = joiPipe(schemaOrOptions as Joi.ObjectSchema);
      } else {
        const opts = schemaOrOptions as IJoiBodyOptions;

        pipe = joiPipe(opts.schema, opts.options);
      }

      body = await pipe.transform(body);
    }

    return body;
  },
);
