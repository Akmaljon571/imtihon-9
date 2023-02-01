import Joi from "joi"

export const createSubCategory = Joi.object({
  title: Joi.string().max(100).required(),
  categoryId: Joi.string().required(),
})

export const updateSubCategory = Joi.object({
  title: Joi.string().max(100),
  categoryId: Joi.string(),
})
