import Joi from "joi";

export const registerSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});
