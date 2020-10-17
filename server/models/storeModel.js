import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
	{
		discount: { type: Number, required: true },
		token: { type: String, required: true },
		isActive: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const storeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
			default: 'Kashem Store',
		},
		contact: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: { type: String, required: true },
		city: { type: String, required: true },
		postalCode: { type: String, required: true },
		country: { type: String, required: true },
		isApproved: { type: Boolean, default: false },
		coupons: [couponSchema],
	},
	{ timestamps: true }
);

export default mongoose.model('Store', storeSchema);
