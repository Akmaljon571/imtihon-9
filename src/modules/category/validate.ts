import Joi from "joi"

export const createCategory = Joi.object({
  title: Joi.string().max(100).required(),
})

export const updateCategory = Joi.object({
  title: Joi.string().max(100),
})
