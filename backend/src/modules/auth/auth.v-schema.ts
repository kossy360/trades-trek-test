import Joi from 'joi';

export const vSignup = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
});

export const vLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
});
