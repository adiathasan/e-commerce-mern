import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveShippingAddressAction } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
	const { shippingAddress } = useSelector((state) => state.shippingProccess);
	const [address, setAddress] = useState(
		shippingAddress ? shippingAddress.address : ''
	);
	const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress ? shippingAddress.postalCode : ''
	);
	const [country, setCountry] = useState(
		shippingAddress ? shippingAddress.country : ''
	);
	const { user } = useSelector((state) => state.userInfo);
	const history = useHistory();
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddressAction({
				address,
				city,
				postalCode,
				country,
			})
		);
		history.push('/payment');
	};
	useEffect(() => {
		if (!user) {
			history.push('/login?redirect=shipping');
		}
	}, [user, history]);
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<CheckoutSteps step2 step1 />
					<h1>shipping</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="address">
							<Form.Label>Address</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="city">
							<Form.Label>City</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter city"
								value={city}
								onChange={(e) => setCity(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="postalCode">
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								required
								type="number"
								placeholder="Enter postal code"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId="country">
							<Form.Label>Country</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}></Form.Control>
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

export default ShippingScreen;
