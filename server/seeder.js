import mongoose from "mongoose";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import { dbConfig, DB_URI_KEY } from "./config/mongoDB.js";

DB_URI_KEY;

dbConfig();

const migrateData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUser = await User.insertMany(users);
    const admin = createdUser[0]._id;

    const sampleProducts = products.map((p) => ({ ...p, user: admin }));

    await Product.insertMany(sampleProducts);
    console.log("data migrated successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  migrateData();
}
