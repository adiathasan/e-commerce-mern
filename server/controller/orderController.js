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
			user: req.user._conditions._id,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
};

export { addOrderItems };
