import Product from '../models/productModel.js';

// @desc fetch all products
// @route GET/api/products
// @access public to all
const getProducts = async (req, res) => {
	const pageSize = 8;
	const page = req.query.pageNumber || 1;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))
		.then((data) =>
			res
				.status(200)
				.json({ products: data, page, pages: Math.ceil(count / pageSize) })
		)
		.catch((err) => res.status(500).json({ error: 'Server error' }));
};

// @desc fetch single product
// @route GET/api/product/:productId
// @access public to all
const getProductById = (req, res) => {
	Product.findById(req.params.productId)
		.populate('store', 'name coupons')
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
// @access private/admin/store
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
		store: '5f8afaf08c689c0a304274bf',
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
		store,
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
		product.store = store || product.store;
		const createdProduct = await product.save();
		res.json(createdProduct);
	} else {
		res.status(404);
		throw new Error('Could not update the product');
	}
};

// @desc create new review
// @route POST/api/product/:productId/review
// @access private/user
const createProductReview = async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.productId);

	if (product) {
		const alreadyReviewedByUser = product.reviews.find(
			(p) => p.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewedByUser) {
			res.status(400);
			res.send('Product Already Reviwed');
		} else {
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};

			product.reviews = [...product.reviews, review];

			product.numReviews = product.reviews.length;

			product.ratings =
				product.reviews.reduce((incrementar, item) => {
					return item.rating + incrementar;
				}, 0) / product.reviews.length;

			await product.save();
			res.status(201).send('Review Added');
		}
	} else {
		res.status(404);
		throw new Error('Could not review the product');
	}
};

// @desc get carousel products
// @route GET/api/products/carousel
// @access public to all
const getCarouseltProducts = (req, res) => {
	Product.find({})
		.sort({ rating: -1 })
		.limit(3)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(404).json({ error: 'Product not found' }));
};

export {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
	createProductReview,
	getCarouseltProducts,
};
