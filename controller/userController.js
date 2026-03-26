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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    res.status(200).json({
      success: true,
      message: "user login successfully",
      user,
    });

  } catch (error) {
    console.error(error.message); 
    next(new HttpsError(error.message, 400));
  }
};

export default { add, loginUser};