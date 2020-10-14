import React, { useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import {
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Image,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { getOrderDetailsAction } from '../actions/orderActions.js';
import { getTotalCartPrice } from '../reducers/cartReducers.js';

const OrderScreen = ({ history }) => {
	const { isLoading, order, message } = useSelector(
		(state) => state.orderDetails
	);

	const { user } = useSelector((state) => state.userInfo);

	const { orderId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			history.push('/login');
		}
	}, [user, history]);

	useEffect(() => {
		dispatch(getOrderDetailsAction(orderId));
	}, [dispatch, orderId]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : message ? (
				<Message variant="danger">{message}</Message>
			) : (
				<>
					<Row>
						<Col md={7}>
							<h5>Order No: {order._id}</h5>
							<ListGroup variant="flush">
								<ListGroupItem>
									<h4>Shipping</h4>
									<p>
										<strong>Name: </strong>
										{order?.user?.name}
									</p>
									<p>
										<a href={`mailto:${order?.user?.email}`}>
											{order?.user?.email}
										</a>
									</p>
									<p>
										<strong style={{ fontWeight: '600' }}>Address: </strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city},{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<Message variant="success">
											Delivered on {order?.paidAt}
										</Message>
									) : (
										<Message variant="warning">not Delivered</Message>
									)}
								</ListGroupItem>
								<ListGroupItem>
									<h4>Payment</h4>
									<p>
										<strong style={{ fontWeight: '600' }}>Method: </strong>
										{order.paymentMethod}
									</p>
									{order.isPaid ? (
										<Message variant="success">paid on {order?.paidAt}</Message>
									) : (
										<Message variant="warning">not paid</Message>
									)}
								</ListGroupItem>
								<ListGroupItem>
									<h4>Order Items</h4>
									{order.orderedItems.length === 0 ? (
										<Message>Your Order is empty</Message>
									) : (
										<ListGroup variant="flush">
											{order.orderedItems.map((item) => {
												return (
													<ListGroupItem key={item.cartProduct._id}>
														<Row>
															<Col md={3}>
																<Image
																	src={item.cartProduct.image}
																	fluid
																	alt={item.cartProduct.name}
																	rounded
																/>
															</Col>
															<Col>
																<Link to={'/product/' + item.cartProduct._id}>
																	{item.cartProduct.name}
																</Link>
															</Col>
															<Col md={4}>
																{item.amount} x ${item.cartProduct.price} = $
																{item.amount * item.cartProduct.price}
															</Col>
														</Row>
													</ListGroupItem>
												);
											})}
										</ListGroup>
									)}
								</ListGroupItem>
							</ListGroup>
						</Col>
						<Col md={5}>
							<Card>
								<ListGroup variant="flush">
									<ListGroupItem>
										<h4>Order Summery</h4>
									</ListGroupItem>
									<ListGroupItem className="d-flex align-items-center justify-content-center">
										<Col>Items:</Col>
										<Col>${getTotalCartPrice(order.orderedItems)}</Col>
									</ListGroupItem>
									<ListGroupItem className="d-flex align-items-center justify-content-center">
										<Col>Shipping:</Col>
										<Col>${order.shippingPrice}</Col>
									</ListGroupItem>
									<ListGroupItem className="d-flex align-items-center justify-content-center">
										<Col>VAT:</Col>
										<Col>${order.vat}</Col>
									</ListGroupItem>
									<ListGroupItem className="d-flex align-items-center justify-content-center">
										<Col>Total:</Col>
										<Col>${order.totalPrice}</Col>
									</ListGroupItem>
									{!order.isPaid ||
									order.paymentMethod !== 'Pay on Delivery' ? (
										<ListGroupItem>
											<PayPalButton amount={order.totalPrice} onSuccess={''} />
										</ListGroupItem>
									) : (
										''
									)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
