import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(2).trim().required().messages({
    "string.base": "category name must be string",
    "string.min": "category name must be  atleast 2 character",
    "any.required": "category name must be required",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "description must be in string format",
  }),
});

export default categorySchema;