import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import dotenv from 'dotenv';
import { dbConfig } from './config/mongoDB.js';
import path from 'path';
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
const PORT = process.env.PORT || 5000;

// mongoDB connect

dbConfig();

// middleware

app.use(cors());
app.use(express.json());

// requests
app.get('/', (req, res) => {
	res.send('API ON THE WAY');
});

app.use('/api', router);

app.use((err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
});

// listen to sever

app.listen(PORT, () => {
	console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
