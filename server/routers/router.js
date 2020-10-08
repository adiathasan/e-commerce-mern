import express from "express";
import { getProducts, getProductById } from "../controller/productsApiLogic.js";
const router = express.Router();

router.get("/products", getProducts);

router.get("/product/:productId", getProductById);

export default router;
