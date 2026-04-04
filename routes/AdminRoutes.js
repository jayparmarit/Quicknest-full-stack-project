import express from "express";

import auth from "../middleware/auth.js";
import CheckRole from "../middleware/CheckRole.js";
import AdminController from "../controller/AdminController.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth,
  CheckRole("admin", "super_admin"),
  AdminController.updateUserData,
);

router.delete(
  "/delete/:id",
  auth,
  CheckRole("admin", "super_admin"),
  AdminController.deleteUser,
);

export default router;