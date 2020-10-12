import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePaymentMethodAction } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
	const { shippingAddress } = useSelector((state) => state.shippingProccess);
	const [paymentMethod, setpaymentMethod] = useState('paypal');
	const { user } = useSelector((state) => state.userInfo);
	const history = useHistory();
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethodAction(paymentMethod));
		history.push('/place-order');
	};
	useEffect(() => {
		if (!shippingAddress) {
			history.push('/shipping');
		}
		if (!user) {
			history.push('/login?redirect=shipping');
		}
	}, [user, history, shippingAddress]);
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<CheckoutSteps step2 step1 step3 />
					<h1>Payment Method</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label as="legend">Select Method</Form.Label>
							<Col>
								<Form.Check
									type="radio"
									checked
									label="Paypal or Credit Card"
									id="paypal"
									name="paymentMethod"
									value={paymentMethod}
									onChange={(e) =>
										setpaymentMethod(e.target.value)
									}></Form.Check>
							</Col>
						</Form.Group>
						<Button variant="primary" type="submit" className="btn-block">
							Continue
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default PaymentMethodScreen;
