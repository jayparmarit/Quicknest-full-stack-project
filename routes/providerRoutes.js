import express from "express";
import auth from "../middleware/auth.js";
import providerController from "../controller/providerController.js";
import checkRole from "../middleware/CheckRole.js";

const router = express.Router()

router.post("/registerAsProvider", auth, providerController.registerAsProvider);

router.get("/getProviders", auth,checkRole("admin", "super_admin"),providerController.getProvider);

export default router;