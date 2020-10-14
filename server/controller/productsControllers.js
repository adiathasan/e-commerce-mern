import Product from '../models/productModel.js';

// @desc fetch all products
// @route GET/api/products
// @access public to all
const getProducts = (req, res) => {
	Product.find({})
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json({ error: 'Server error' }));
};

// @desc fetch single product
// @route GET/api/product/:productId
// @access public to all
const getProductById = (req, res) => {
	Product.findById(req.params.productId)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(404).json({ error: 'Product not found' }));
};

// @desc delete single product
// @route DELETE/api/product/:productId
// @access private/admin
const deleteProductById = async (req, res) => {
	const product = Product.findById(req.params.productId);

	if (product) {
		await product.remove();
		res.json({ message: 'product deleted' });
	} else {
		res.status(404);
		throw new Error('Could not delete the product');
	}
};

// @desc create products
// @route CREATE/api/products
// @access private/admin
const createProduct = async (req, res) => {
	const product = new Product({
		name: 'sample',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'sample brand',
		category: 'sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'sample description',
	});

	const createdProduct = await product.save();

	if (createdProduct) {
		res.status(201).json(createdProduct);
	} else {
		res.status(404);
		throw new Error('Could not create the product');
	}
};

// @desc update product
// @route UPDATE/api/product/:productId
// @access private/admin
const updateProduct = async (req, res) => {
	const {
		name,
		price,
		user,
		image,
		brand,
		category,
		countInStock,
		numReviews,
		description,
	} = req.body;

	const product = await Product.findById(req.params.productId);

	if (product) {
		product.name = name || product.name;
		product.price = price || product.price;
		product.user = user || product.user;
		product.image = image || product.image;
		product.brand = brand || product.brand;
		product.category = category || product.category;
		product.countInStock = countInStock || product.countInStock;
		product.numReviews = numReviews || product.numReviews;
		product.description = description || product.description;
		const createdProduct = await product.save();
		res.json(createdProduct);
	} else {
		res.status(404);
		throw new Error('Could not update the product');
	}
};

export {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
};
