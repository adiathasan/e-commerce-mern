import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { Link, useParams } from 'react-router-dom';
import { instance } from '../axios.js';
import {
	getSingleProduct,
	updateProductAction,
} from '../actions/productActions.js';
import { PRODUCT_UPDATE_RESET } from '../CONSTANTS.js';

const ProductEditScreen = ({ history }) => {
	const [price, setPrice] = useState(0);
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const { productId } = useParams();
	const { product, isLoading, message } = useSelector(
		(state) => state.productDetail
	);
	const {
		isLoading: loadingUpdate,
		message: messageUpdate,
		success: successUpdate,
	} = useSelector((state) => state.productUpdate);
	const { user } = useSelector((state) => state.userInfo);

	useEffect(() => {
		if (successUpdate) {
			dispatch({
				type: PRODUCT_UPDATE_RESET,
			});
			history.push('/admin/products');
		}
		if (!user || !user.isAdmin) {
			history.push('/login');
		}
		dispatch(getSingleProduct(productId));
	}, [dispatch, productId, user, successUpdate, history]);

	useEffect(() => {
		if (product.name) {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [product]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateProductAction({
				_id: productId,
				price,
				name,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	const handleUpload = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		try {
			for (var key of formData.entries()) {
				console.log(key[0] + ', ' + key[1]);
			}
			const { data } = await instance.post('/upload', formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	return isLoading || loadingUpdate ? (
		<Loader />
	) : message ? (
		<Message variant="danger">{message}</Message>
	) : messageUpdate ? (
		<Message variant="danger">{messageUpdate}</Message>
	) : (
		<>
			<Link to="/admin/products" className="btn btn-light m-y">
				Go back
			</Link>
			<Container>
				<Row className="justify-content-md-center">
					<Col xs={12} md={6}>
						<h1>Edit Product</h1>

						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) => setName(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Price</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="number"
									placeholder="Enter Price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Image</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="text"
									placeholder="Enter Image URL If Wish"
									value={image}
									onChange={(e) => setImage(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.File
								disabled={uploading}
								id="image-file"
								label="choose file"
								custom
								onChange={handleUpload}></Form.File>
							<Form.Group>
								<Form.Label>Brand</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="text"
									placeholder="Enter Brand"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>CountInStock</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="number"
									placeholder="Enter CountInStock"
									value={countInStock}
									onChange={(e) =>
										setCountInStock(e.target.value)
									}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="text"
									placeholder="Enter Description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Category</Form.Label>
								<Form.Control
									disabled={uploading}
									required
									type="text"
									placeholder="Enter Category"
									value={category}
									onChange={(e) => setCategory(e.target.value)}></Form.Control>
							</Form.Group>

							<Button
								disabled={uploading}
								variant="primary"
								type="submit"
								className="mt-2 btn-block">
								Update
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ProductEditScreen;
