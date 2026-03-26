
import HttpsError from "./HttpError.js";

const validate = (schema) => () => {
    try {
        const { error, value } = schema.validate(req.body,{
            abortEarly:true,
            allowUnknown:false,
            stripUnknown:true,
        });

        if(error){
            return next(new HttpsError(error.details[0].message,400));
        }
        req.body = value;

        next()
    } catch (error) {
        throw new Error(error.message)
    }
}

export default validate;