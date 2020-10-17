import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Store from '../models/storeModel.js';
import Product from '../models/productModel.js';
import asynchandler from 'express-async-handler';

const protect = asynchandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
			req.user = await User.findById(decoded.userId).select('-password');

			next();
		} catch (error) {
			throw new Error(error);
		}
	}

	if (!token) {
		res.status(401).send({ message: 'Not authorized' });
	}
});

const isProductStore = async (req, res, next) => {
	const hasStore = await Store.findOne({ user: req.user._id });
	if (req.user.isAdmin) {
		next();
	} else if (hasStore) {
		const product = await Product.findOne({ store: hasStore._id });
		if (product) {
			next();
		} else {
			res.status(401).send({ message: 'Not authorized as an Admin' });
		}
	}
};

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401).send({ message: 'Not authorized as an Admin' });
	}
};

export { protect, isAdmin, isProductStore };
