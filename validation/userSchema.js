import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().min(2).trim().messages({
    "string.base": "Name must be in string format",
    "string.empty": "name is required",
    "string.min": "name must be atleast 2 character long",
  }),
  email: Joi.string().email().messages({
    "string.empty": "email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))

    .messages({
      "string.empty": "password is required",
      "string.min": "password must be atleast 6 character long",
    }),
  phone: Joi.number().min(1000000000).max(9999999999).messages({
    "number.empty": "number is required",
  }),
  role: Joi.string()
    .valid("customer", "provider", "admin", "super_admin")
    .optional()
    .messages({
      "string.empty":
        "role is required from any of these customer. provider,admin,super_admin",
    }),
});

export const createUserSchema = UserSchema.fork(
  ["name", "email", "password", "phone"],
  (field) =>
    field.required().messages({
      "any.required": "{#label} is required",
    }),
);

export const updateUserSchema = UserSchema.fork(
  ["name", "password", "phone"],
  (fields) =>
    fields.optional().messages({
      "object.missing":
        "name or password or phone any of these field is required when updating",
    }),
);