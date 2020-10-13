import express from 'express';
import {
	addOrderItems,
	getMyOrders,
	getOrderedItems,
	updateOrderToPaid,
} from '../controller/orderController.js';
import {
	getProducts,
	getProductById,
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

router.route('/products').get(getProducts);

router.route('/product/:productId').get(getProductById);

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

router.route('/orders').post(protect, addOrderItems);

router.route('/orders/myorders').get(protect, getMyOrders);

router.route('/orders/:orderId').get(protect, getOrderedItems);

router.route('/orders/:orderId/pay').put(protect, updateOrderToPaid);

export default router;
