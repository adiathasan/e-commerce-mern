import Store from '../models/storeModel.js';
import Product from '../models/productModel.js';

// @desc get store for users
// @route GET/api/store/:storeId
// @access public to all
const getStoreController = (req, res) => {
	Store.findById(req.params.storeId)
		.populate('user', 'email name')
		.then((store) => {
			Product.find({ store: store._id })
				.then((products) => {
					res.json({ store, products });
				})
				.catch((err) => {
					res.status(404).send('Store products not found');
				});
		})
		.catch((err) => {
			res.status(404).send('Store not found');
		});
};

// @desc get all store for admin
// @route GET/api/stores
// @access public/admin/users
const getAllStoresController = (req, res) => {
	Store.find()
		.populate('user', 'email name')
		.sort({ createdAt: -1 })
		.then((stores) => {
			res.json(stores);
		})
		.catch((err) => {
			res.status(404).send('Stores not found');
		});
};

// @desc create store
// @route POST/api/stores
// @access public/users
const createStoreController = async (req, res) => {
	try {
		const checkStoreWithUser = await Store.find({
			user: req.body.user,
		}).populate('user', 'isPro');
		if (checkStoreWithUser.length > 0) {
			res.send('Upgrade to pro for multiple stores');
		} else {
			const store = new Store(req.body);
			const createdStore = await store.save();
			res.status(201).json(createdStore);
		}
	} catch (error) {
		res.status(401).sjson(error);
	}
};

// @desc update store
// @route PUT/api/store/:id
// @access private/users
const updatetStoreController = async (req, res) => {
	try {
		const store = await Store.findById(req.params.storeId);
		if (store) {
			store.address = req.body.address;
			store.city = req.body.city;
			store.postalCode = req.body.postalCode;
			store.name = req.body.name;
			store.email = req.body.email;
			store.contact = req.body.contact;
			await store.save();
			res.status(201).send('Store Updated Successfully');
		} else {
			res.status(401).send('Store not found');
		}
	} catch (error) {
		res.status(401).json(error);
	}
};

// @desc create coupon
// @route POST/api/store/admin/:storeId/coupon
// @access private/store managers
const createCouponController = async (req, res) => {
	try {
		const store = await Store.findById(req.params.storeId);
		console.log(store);
		if (store) {
			const coupon = {
				discount: req.body.discount,
				token: req.body.token,
				isActive: req.body.isActive,
			};
			store.coupons = [...store.coupons, coupon];

			await store.save();
			res.send('coupon was created successfully');
		} else {
			res.send('oops no store found to create coupon');
		}
	} catch (error) {
		res.json(error);
	}
};

// @desc chango coupon status
// @route PUT/api/store/admin/:storeId/coupon/:couponId
// @access private/store managers
const setActiveCouponController = async (req, res) => {
	try {
		const store = await Store.findById(req.params.storeId);

		if (store) {
			let coupons = store.coupons;
			coupons = coupons.map((coupon) => {
				console.log(coupon);
				if (coupon._id == req.params.couponId) {
					coupon.isActive = !coupon.isActive;
					return coupon;
				}
				return coupon;
			});
			console.log(coupons);
			store.coupons = coupons;
			await store.save();
			res.send('coupon updated to active successfully');
		} else {
			res.send('oops no store found to update the coupon');
		}
	} catch (error) {
		res.json(error);
	}
};

export {
	getStoreController,
	getAllStoresController,
	createStoreController,
	createCouponController,
	setActiveCouponController,
	updatetStoreController,
};
