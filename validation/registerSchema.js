import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(2).trim().required(),
    // messages({
    //     "name.base":"name must be in string format",
    //     "name.empty":"name is required",
    //     "name.min":"name must be atleast 2 character long",
    // }),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone:Joi.number().min(1000000000).max(9999999999).required(),
    role:Joi.string().optional()
})

export default registerSchema;