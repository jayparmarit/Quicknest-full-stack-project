import express from "express"

import userController from "../controller/userController.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/registerSchema.js";

const router = express.Router();

router.post("/addUser",validate(registerSchema), userController.add)
router.post("/loginUser",userController.loginUser)

export default router

