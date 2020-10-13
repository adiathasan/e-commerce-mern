import React, { useEffect } from 'react';
import {
	Button,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Image,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import CheckoutSteps from '../components/CheckoutSteps';
import { getTotalCartPrice } from '../reducers/cartReducers.js';
import { createOrderAction } from '../actions/orderActions.js';

const PlaceOrderScreen = () => {
	const { cartProducts } = useSelector((state) => state.cartTotalItem);
	const {
		shippingAddress: { address, city, postalCode, country },
		paymentMethod,
	} = useSelector((state) => state.shippingProccess);
	const { order, message, success } = useSelector((state) => state.orderCreate);
	const history = useHistory();
	const dispatch = useDispatch();
	const VATCost = () => {
		return Number(getTotalCartPrice(cartProducts) * 0.15).toFixed(0);
	};
	const shippingCost = () => {
		return getTotalCartPrice(cartProducts) > 100 ? 100 : 0;
	};
	const TotalPrice = () => {
		return getTotalCartPrice(cartProducts) + shippingCost() + VATCost();
	};
	const handlePlaceOrder = () => {
		dispatch(
			createOrderAction({
				orderedItems: cartProducts,
				shippingAddress: { address, city, postalCode, country },
				paymentMethod,
				vat: VATCost(),
				shippingPrice: shippingCost(),
				totalPrice: TotalPrice(),
			})
		);
	};

	useEffect(() => {
		if (success) {
			history.push('/order/' + order._id);
		}
	}, [history, success, order]);

	return (
		<>
			<>
				<CheckoutSteps step1 step2 step3 step4 />
				<Row>
					<Col md={8}>
						<ListGroup variant="flush">
							<ListGroupItem>
								<h4>Shipping</h4>
								<p>
									<strong style={{ fontWeight: '600' }}>Address: </strong>
									{address}, {city}, {postalCode}, {country}
								</p>
							</ListGroupItem>
							<ListGroupItem>
								<h4>Payment</h4>
								<p>
									<strong style={{ fontWeight: '600' }}>Method: </strong>
									{paymentMethod}
								</p>
							</ListGroupItem>
							<ListGroupItem>
								<h4>Order Items</h4>
								{cartProducts.length === 0 ? (
									<Message>Your cart is empty</Message>
								) : (
									<ListGroup variant="flush">
										{cartProducts.map((item) => {
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
					<Col md={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroupItem>
									<h4>Order Summery</h4>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Items:</Col>
										<Col>${getTotalCartPrice(cartProducts)}</Col>
									</Row>
									<Row>
										<Col>Shipping:</Col>
										<Col>${shippingCost()}</Col>
									</Row>
									<Row>
										<Col>VAT:</Col>
										<Col>${VATCost()}</Col>
									</Row>
									<Row>
										<Col>Total:</Col>
										<Col>${TotalPrice()}</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									{message && <Message variant="danger">{message}</Message>}
									<Button
										onClick={handlePlaceOrder}
										variant="primary"
										className="btn-block"
										disabled={cartProducts.length === 0}>
										Place Order
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</>
		</>
	);
};

export default PlaceOrderScreen;
