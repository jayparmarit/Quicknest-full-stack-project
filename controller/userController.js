import HttpsError from "../middleware/HttpError.js";
import User from "../model/User.js";

const add = async (req, res, next)=>{
    try{
        const { name, email, password, phone, roll } = req.body;

        const newUser = {
                name,
                email,
                password,
                phone,
                roll,
        }

        const user = new User(newUser)

        await user.save();

        res.status(201).json({success:true, user})
    }catch(error){
        next(new HttpsError(error.message, 500))
    }
}

export default {add};