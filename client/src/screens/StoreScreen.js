import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleStore } from '../actions/storeActions';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const StoreScreen = () => {
	const dispatch = useDispatch();
	const { storeId } = useParams();
	const { store, products, isLoading, message } = useSelector(
		(state) => state.getStoreDetails
	);
	useEffect(() => {
		console.log(storeId);
		dispatch(getSingleStore(storeId));
	}, [dispatch, storeId]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : message ? (
				<Message variant={'danger'}>{message}</Message>
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
					<Row>
						{products?.map((product) => {
							return (
								<Col
									key={product?._id}
									md={6}
									sm={12}
									lg={4}
									xl={3}
									className="home__product">
									<Product product={product} />
								</Col>
							);
						})}
					</Row>
					<Row>
						<Col md={6} sm={12} lg={4} xl={3}>
							{store.coupons && (
								<>
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

export default StoreScreen;
