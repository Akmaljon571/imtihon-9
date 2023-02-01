import Joi from "joi"

export const createKarzinka = Joi.object({
  productId: Joi.string().required(),
})
