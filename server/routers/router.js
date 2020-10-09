import express from "express";
import {
  getProducts,
  getProductById,
} from "../controller/productsControllers.js";
import {
  authUserController,
  getUserProfileController,
  userRegisterController
} from "../controller/usersController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// product routes

router.route("/products").get(getProducts);

router.route("/product/:productId").get(getProductById);

// user routes

router.route("/users/").post(userRegisterController);

router.route("/users/login").post(authUserController);

router.route("/users/profile").get(protect, getUserProfileController);


export default router;
