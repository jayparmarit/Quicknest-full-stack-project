import jwt from "jsonwebtoken";

import Joi from "joi"
import HttpsError from "./HttpError.js"
import User from "../model/User.js";

const auth = async function (req, res, next) {
    try {
        const authHeader = req.header("authorization");

        if(!authHeader){
            return next(new HttpsError("auth header is required",401))
        }
        const token = authHeader.replace("Bearer ","");

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findOne({
            _id:decoded._id,
            "tokens.token":token,
        });

        if(!user){
            return next(new HttpsError("authentication failed",401))
        }

        req.user = user;

        req.token = token

        next()
    } catch (error) {
        next(new HttpsError("please authenticate",401))
    }
}

export default auth;