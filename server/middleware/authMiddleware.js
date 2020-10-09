import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asynchandler from "express-async-handler";

const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
      req.user = User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      res.status(401).send(error)
    }

  }

  if (!token) {
    res.status(401).send({ message: "Not authorized" });
  }

});

export { protect };
