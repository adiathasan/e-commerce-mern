import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// connection

const dbConfig = async () => {
	try {
		const DB_URI_KEY = process.env.DB_URI_KEY.toString();
		const conn = await mongoose.connect(DB_URI_KEY, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log(`connected to ${conn.connection.host}`);
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

export { dbConfig };
