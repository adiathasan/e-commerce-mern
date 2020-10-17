import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleStore } from '../actions/storeActions';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@material-ui/core';
import { createProductAction } from '../actions/productActions.js';

const StoreManageScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { storeId } = useParams();
	const { store, products, isLoading, message } = useSelector(
		(state) => state.getStoreDetails
	);
	const {
		success: successCreate,
		isLoading: loadingCreate,
		message: errorCreate,
		product: createdProduct,
	} = useSelector((state) => state.productCreate);
	useEffect(() => {
		if (successCreate) {
			history.push('/admin/product/' + createdProduct._id + '/edit');
		} else {
			dispatch(getSingleStore(storeId));
		}
	}, [dispatch, storeId, createdProduct, successCreate, history]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleCreateProduct = () => {
		dispatch(createProductAction());
	};

	return (
		<>
			{isLoading || loadingCreate ? (
				<Loader />
			) : message ? (
				<Message variant={'danger'}>{message}</Message>
			) : errorCreate ? (
				<Message variant={'danger'}>{errorCreate}</Message>
			) : (
				<>
					<Helmet>
						<title>{'Khulna-Shop | ' + store.name}</title>
					</Helmet>
					<h1 className="mt-3">{store.name} Products</h1>
					{store.coupons?.length === 0 ? (
						''
					) : (
						<h4 className="mt-3">
							Todays coupon: {store.coupons && store.coupons[0].token} (
							{store.coupons && store.coupons[0].discount}%)
						</h4>
					)}
					<Button
						variant="contained"
						onClick={handleCreateProduct}
						style={{ marginBottom: '1rem' }}>
						Add product
					</Button>
					<Row>
						{products.length !== 0 ? (
							products?.map((product) => {
								return (
									<Col
										key={product?._id}
										md={6}
										sm={12}
										lg={4}
										xl={3}
										className="home__product">
										<Product store product={product} />
									</Col>
								);
							})
						) : (
							<Message>No products in your store</Message>
						)}
					</Row>
					<Row>
						<Col md={6} sm={12} lg={4} xl={3}>
							{store.coupons && (
								<>
									<Button
										variant="contained"
										onClick={() => {
											history.push('/createstore?id=' + store._id);
										}}>
										Edit Store
									</Button>
									<p className="mt-2">contact: {store.contact}</p>
									<p className="mt-2">email: {store.email}</p>
									<p className="mt-2">address: {store.address}</p>
									<p className="mt-2">city: {store.city}</p>
									<p className="mt-2">postal code: {store.postalCode}</p>
								</>
							)}
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default StoreManageScreen;
