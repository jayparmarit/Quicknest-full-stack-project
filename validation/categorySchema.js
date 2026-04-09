import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().label("category name").messages({
    "string.base": "category name must be string",
    "string.empty":"category name is required",
    "string.min": "category name must be  atleast 2 character",
    "string.max": "category name must not exceed 50 characters",
  }),
  description: Joi.string().max(50).trim().optional().label("description").messages({
    "string.base": "description must be in string format",
    "string.max":"description must not exceed 500 characters"
  }),
});

// CREATE 


export const createCategorySchema = categorySchema.fork(
  ["name"],
  (fields)=> fields.required(),
).messages({
  "any.required":"{#label} is required",
});

export const updateCategorySchema = categorySchema.fork(
  ["name","description"],
  (fields)=> fields.optional(),
).or("name","description").messages({
  "object.missing":"name or description any of these field is required when updating",
});

export default createCategorySchema