import Joi from "joi";

export const prodcutValidation = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(3).required(),
  category: Joi.string().min(3).required(),

});

