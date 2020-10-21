import axios from 'axios';

export const instance = axios.create({
	baseURL: 'https://khulna-shop.herokuapp.com/api',
	// baseURL: 'http://localhost:5000/api',
});
