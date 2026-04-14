import express from "express";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";

import categorySchema from "../validation/categorySchema.js";

import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import serviceController from "../controller/serviceController.js";

const router = express.Router();

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);

router.patch(
  "/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.update,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  userController.deleteUser,
);

// <---------------category---------->


router.post(
  "/addCategory",
  auth,
  validate(categorySchema),
  checkRole("admin", "super_admin"),
  categoryController.add,
);


// <---------------service---------->


router.post(
  "/addService",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.add,
);

export default router;