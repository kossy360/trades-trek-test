import { PipeTransform } from '@nestjs/common';
import Joi, { ObjectSchema, ValidationOptions } from 'joi';

export class JoiPipe implements PipeTransform {
  constructor(
    private validationSchema: ObjectSchema = Joi.object({}),
    private options: ValidationOptions = {},
  ) {}

  async transform(value: any) {
    const result = await this.validationSchema.validateAsync(value, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
      ...this.options,
    });

    return result;
  }
}

export function joiPipe(validationSchema: ObjectSchema, options?: ValidationOptions) {
  return new JoiPipe(validationSchema, options);
}
