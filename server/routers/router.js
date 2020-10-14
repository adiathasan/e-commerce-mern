import express from 'express';
import { upload } from '../config/imgConfig.js';
import {
	addOrderItems,
	getMyOrders,
	getOrderedItems,
	updateOrderToPaid,
	getAllOrders,
	updateOrderToDelivered,
} from '../controller/orderController.js';
import {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
	createProductReview,
} from '../controller/productsControllers.js';
import {
	authUserController,
	deleteUserController,
	getAllUsersController,
	getUserProfileController,
	updateUserProfileController,
	userRegisterController,
	getUserById,
	updateUserById,
} from '../controller/usersController.js';

import { isAdmin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// product routes

router
	.route('/products')
	.get(getProducts)
	.post(protect, isAdmin, createProduct);

router.route('/product/:productId/review').post(protect, createProductReview);

router
	.route('/product/:productId')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProductById)
	.put(protect, isAdmin, updateProduct);

// user routes

router
	.route('/users/')
	.post(userRegisterController)
	.get(protect, isAdmin, getAllUsersController);

router.route('/users/login').post(authUserController);

router
	.route('/users/profile')
	.get(protect, getUserProfileController)
	.put(protect, updateUserProfileController);

router
	.route('/users/:userId')
	.delete(protect, isAdmin, deleteUserController)
	.get(protect, isAdmin, getUserById)
	.put(protect, isAdmin, updateUserById);

// order route

router
	.route('/orders')
	.post(protect, addOrderItems)
	.get(protect, isAdmin, getAllOrders);

router.route('/orders/myorders').get(protect, getMyOrders);

router.route('/orders/:orderId').get(protect, getOrderedItems);

router.route('/orders/:orderId/pay').put(protect, updateOrderToPaid);

router.route('/orders/:orderId/deliver').put(protect, updateOrderToDelivered);

// image upload route

router.post('/upload', upload.single('image'), (req, res) => {
	console.log('logged');
	res.send(`/${req.file.path}`);
});

export default router;
