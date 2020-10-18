import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleStore } from '../actions/storeActions';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@material-ui/core';
import { createProductAction } from '../actions/productActions.js';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const StoreManageScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { storeId } = useParams();
	const { store, products, isLoading, message } = useSelector(
		(state) => state.getStoreDetails
	);
	const { user } = useSelector((state) => state.userInfo);
	const {
		success: successCreate,
		isLoading: loadingCreate,
		message: errorCreate,
		product: createdProduct,
	} = useSelector((state) => state.productCreate);

	useEffect(() => {
		if (!user || user.store[0]._id !== storeId) {
			history.push('/login');
		}
		if (successCreate) {
			history.push('/admin/product/' + createdProduct._id + '/edit');
		} else {
			dispatch(getSingleStore(storeId));
		}
	}, [dispatch, storeId, createdProduct, successCreate, history, user]);

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
					<h1 className="mt-3">{store.name}</h1>
					<h3 className="mt-3">Today's Active coupons: </h3>
					{store.coupons?.length === 0
						? ''
						: store.coupons?.map(
								(coupon) =>
									coupon.isActive && (
										<h4 className="mt-3" key={coupon._id}>
											{coupon.token} ({coupon.discount}%)
										</h4>
									)
						  )}
					<Row className="text-center">
						<Col md={4}>
							<Button
								variant="contained"
								onClick={handleCreateProduct}
								style={{ marginBottom: '1rem' }}>
								Add product
							</Button>
						</Col>
						<Col md={4}>
							<Button
								style={{ marginBottom: '1rem' }}
								variant="contained"
								onClick={() => {
									history.push('/createstore?id=' + store._id);
								}}>
								Edit Store
							</Button>
						</Col>
						<Col md={4}>
							<Button
								style={{ marginBottom: '1rem' }}
								variant="contained"
								onClick={() => {
									history.push(
										`/createstore?id=${
											store._id
										}=${'coupon-no-id'}=${'Sample Coupon'}=${' '}=${'false'}=${'createCoupon'}`
									);
								}}>
								Create coupon
							</Button>
						</Col>
					</Row>
					<Table className="table-sm" striped hover responsive bordered>
						<thead>
							<tr>
								<th>ID</th>
								<th>TOKEN NAME</th>
								<th>ACTIVE</th>
								<th>DISCOUNT(%)</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{store.coupons &&
								store.coupons.map((coupon) => (
									<tr key={coupon._id}>
										<td>{coupon._id}</td>
										<td>{coupon.token}</td>
										<td>
											{coupon.isActive ? (
												<CheckOutlinedIcon
													style={{ color: 'green', transform: 'scale(.85)' }}
												/>
											) : (
												<ClearOutlinedIcon
													style={{ color: 'red', transform: 'scale(.85)' }}
												/>
											)}
										</td>
										<td>{coupon.discount}</td>
										<td>
											<Button
												onClick={() => {
													history.push(
														`/createstore?id=${store._id}=${coupon._id}=${coupon.token}=${coupon.discount}=${coupon.isActive}`
													);
												}}
												variant="contained"
												className="btn-sm">
												<EditOutlinedIcon
													style={{
														color: 'blue',
														transform: 'scale(.85)',
													}}
												/>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
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
					<Row className="bg-primary text-white">
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

export default StoreManageScreen;
