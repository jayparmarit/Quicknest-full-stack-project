import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    roll: {
        type: String,
        enum: ["customer", "provider", "admin", "super-main"],
        default: "customer",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

userSchema.pre("save", async function(){
    const user = this;

    if(!user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }
});

userSchema.statics.findByCredentials = async function (email, password) {
    try {
        const user = await this.findOne({email})
        if(!user){
            throw new Error("unable to login")
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error("unable to login")
        }
        return user;

    } catch (error) {
        throw new Error(error.message)
    }
}

const User = mongoose.model("user", userSchema)

export default User;