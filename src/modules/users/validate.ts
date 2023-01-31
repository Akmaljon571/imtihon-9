import Joi from "joi"

export const createLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().max(13).required(),
})

export const createRegistr = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().max(50).required(),
  phone: Joi.string().max(13).required(),
  gender: Joi.boolean().required(),
})

export const emailSchema = Joi.object({
  emailCode: Joi.number().required(),
})
