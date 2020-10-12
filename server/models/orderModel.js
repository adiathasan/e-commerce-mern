import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema } = pkg;
const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderedItems: [
			{
				amount: { type: Number, required: true },
				cartProduct: {
					name: { type: String, required: true },
					image: { type: String, required: true },
					price: { type: Number, required: true },
					_id: {
						type: Schema.Types.ObjectId,
						required: true,
						ref: 'Product',
					},
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_items: { type: String },
			email_address: { type: String },
		},
		vat: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
			required: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Order', orderSchema);
