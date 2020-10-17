import products from './data/products.js';
import users from './data/users.js';
import User from './models/userModel.js';
import Store from './models/storeModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import { dbConfig } from './config/mongoDB.js';

dbConfig();

const migrateData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();
		await Store.deleteMany();
		const createdUser = await User.insertMany(users);
		const admin = createdUser[0]._id;
		const store = await Store.insertMany([
			{
				user: admin,
				name: 'Kashem Store',
				contact: '01729143339',
				email: createdUser[0].email,
				address: 'fulbarigate, khulna',
				city: 'khulna',
				postalCode: '9024',
				country: 'Bangladesh',
			},
		]);
		const sampleProducts = products.map((p) => ({
			...p,
			user: admin,
			store: store[0]._id,
		}));

		await Product.insertMany(sampleProducts);
		console.log('data migrated successfully');
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('data destroyed');
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	migrateData();
}
