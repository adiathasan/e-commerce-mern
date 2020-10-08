import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc fetch all products
// @route GET/api/products
// @access public to all
const getProducts = (req, res) => {
  Product.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: "Server error" }));
};

// @desc fetch single product
// @route GET/api/product/:productId
// @access public to all
const getProductById = (req, res) => {
  Product.findById(req.params.productId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ error: "Product not found" }));
};

export { getProducts, getProductById };
