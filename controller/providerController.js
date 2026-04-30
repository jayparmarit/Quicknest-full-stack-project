import User from "../model/User.js";
import Service from "../model/Service.js";

import HttpError from "../middleware/HttpError.js";
import Provider from "../model/Provider.js";

const registerAsProvider = async (req, res, next)=>{
    try {
        
        const userId = req.user._id;

        const user = await User.findById(userId)

        if(!user){
            return next(new HttpError("user not found",404))
        }

        const existingProvider = await Provider.findById(userId)

        if(existingProvider){
            return next(new HttpError("already provider registered with this id",500))
        }

        const { services, experience, documents } = req.body;

        if(!services || !Array.isArray(services) || services.length === 0){
            return next (new HttpError("service are missing"));
        }

        const newProvider = new Provider({
            userId,
            services:validService,
            experience,
            documents,
        })

        user.role = "provider"

        await user.save();

        await newProvider.save();

        res.status(201).json({ success: true, message:"provider account registered wait for admin approval",newProvider});

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

const getProvider = async (req, res, next)=>{

        try {
            
            let query = {};

            let { isVerified } = req.query;

            if(isVerified != undefined){
                query.isVerified = isVerified === "true";
            }

            const providers = await Provider.find(query).populate([{ path:"userId", select:"name email phone"},{ path:"services", select:"name"}])

            if(!providers.length){
                return next(new HttpError("no provider data found",404))
            }

            res.status(200).json({ success:true, message:"provider details fetched successfully", length: providers.length, providers})

        } catch (error) {
            next(new HttpError(error.message,500))
        }
}




export default { registerAsProvider, getProvider }