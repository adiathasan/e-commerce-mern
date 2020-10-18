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
	getCarouseltProducts,
} from '../controller/productsControllers.js';
import {
	createCouponController,
	createStoreController,
	getAllStoresController,
	getStoreController,
	updateCouponController,
	updatetStoreController,
} from '../controller/storeController.js';
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

import {
	isAdmin,
	isProductStore,
	isStoreAdmin,
	protect,
} from '../middleware/authMiddleware.js';
const router = express.Router();

// product routes

router.route('/products').get(getProducts).post(protect, createProduct);

router.route('/products/carousel').get(getCarouseltProducts);

router.route('/product/:productId/review').post(protect, createProductReview);

router
	.route('/product/:productId')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProductById)
	.put(protect, isProductStore, updateProduct);

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

// order routes

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

// store routes

router
	.route('/stores')
	.get(getAllStoresController)
	.post(protect, createStoreController);

router
	.route('/store/admin/:storeId/coupon')
	.post(protect, isStoreAdmin, createCouponController);
router
	.route('/store/admin/:storeId/coupon/:couponId')
	.put(protect, isStoreAdmin, updateCouponController);

router
	.route('/store/:storeId')
	.get(getStoreController)
	.put(protect, isStoreAdmin, updatetStoreController);

export default router;
