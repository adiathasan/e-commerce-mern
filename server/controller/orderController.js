import Order from '../models/orderModel.js';

// @desc create new order
// @route POST/api/orders/
// @access private
const addOrderItems = async (req, res) => {
	const {
		orderedItems,
		shippingAddress,
		paymentMethod,
		vat,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderedItems && orderedItems.length === 0) {
		res.status(400);
		throw new Error('No order Items');
	} else {
		const order = new Order({
			orderedItems,
			shippingAddress,
			paymentMethod,
			vat,
			shippingPrice,
			totalPrice,
			user: req.user._id,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
};

// @desc get an order by id
// @route GET/api/orders/:orderId
// @access private
const getOrderedItems = async (req, res) => {
	const order = await Order.findById(req.params.orderId).populate(
		'user',
		'name email'
	);
	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
};

// @desc update order to paid
// @route PUT/api/orders/:orderId/pay
// @access private
const updateOrderToPaid = async (req, res) => {
	const order = await Order.findById(req.params.orderId);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = req.body;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
};

// @desc get orders to logged in user
// @route GET/api/orders/myorders
// @access private
const getMyOrders = async (req, res) => {
	const order = await Order.find({ user: req.user._id });

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Orders not found');
	}
};

// @desc get all orders for admin
// @route GET/api/orders
// @access private
const getAllOrders = async (req, res) => {
	const order = await Order.find({})
		.populate('user', 'id name')
		.sort({ createdAt: -1 });

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Orders not found');
	}
};

// @desc update order to delivered
// @route PUT/api/orders/:orderId/deliver
// @access private
const updateOrderToDelivered = async (req, res) => {
	const order = await Order.findById(req.params.orderId).populate(
		'user',
		'email _id'
	);

	if (order) {
		order.isDelivered = true;
		if (order.paymentMethod === 'Pay on Delivery') {
			order.isPaid = true;
			order.paymentResult = {
				id: order.user._id,
				status: 'Paid on Delivery',
				update_items: '***',
				email_address: order.user.email,
			};
		}
		order.deliveredAt = Date.now();
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
};

export {
	addOrderItems,
	getOrderedItems,
	updateOrderToPaid,
	getMyOrders,
	getAllOrders,
	updateOrderToDelivered,
};
