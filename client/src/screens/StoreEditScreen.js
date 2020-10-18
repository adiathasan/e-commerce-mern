import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createStoreAction,
	getSingleStore,
	updateStoreAction,
} from '../actions/storeActions';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import Message from '../components/Message';
import { CREATE_STORE_FAIL, UPDATE_STORE_RESET } from '../CONSTANTS';
import Loader from '../components/Loader';

const StoreEditScreen = () => {
	const [address, setAddress] = useState('');
	const [message, setMessage] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [email, setEmail] = useState('');
	const [coupon, setCoupon] = useState('');
	const [discount, setDiscount] = useState('');
	const { user } = useSelector((state) => state.userInfo);
	const { success, isLoading, message: error } = useSelector(
		(state) => state.createStore
	);
	const {
		success: successUpdate,
		isLoading: loadingUpdate,
		message: errorUpdate,
	} = useSelector((state) => state.updateStore);
	const {
		success: successDetails,
		store,
		isLoading: loadingDetails,
		message: errorDetails,
	} = useSelector((state) => state.getStoreDetails);
	const history = useHistory();
	const [
		searchParams,
		storeId,
		couponId,
		couponToken,
		couponeDiscount,
	] = history.location.search ? history.location.search.split('=') : null;

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (storeId) {
			dispatch(
				updateStoreAction(storeId, {
					address,
					city,
					postalCode,
					name,
					contact,
					email,
				})
			);
		} else {
			dispatch(
				createStoreAction({
					user: user._id,
					address,
					city,
					postalCode,
					name,
					contact,
					email,
					country: 'Bangladesh',
				})
			);
		}
	};
	useEffect(() => {
		setDiscount(couponeDiscount);
		setCoupon(couponToken);
	}, [couponToken, couponeDiscount]);
	useEffect(() => {
		if (successUpdate) {
			setMessage('Store Updated Successfully');
			dispatch({ type: UPDATE_STORE_RESET });
			setTimeout(() => {
				setMessage(null);
			}, 4000);
		}
		if (storeId) {
			dispatch(getSingleStore(storeId));
		}
	}, [dispatch, storeId, successUpdate, searchParams]);
	useEffect(() => {
		if (successDetails) {
			setAddress(store.address);
			setCity(store.city);
			setPostalCode(store.postalCode);
			setName(store.name);
			setContact(store.contact);
			setEmail(store.email);
		}
	}, [store, successDetails]);
	useEffect(() => {
		if (success) {
			setMessage('Store created successfully');
			setTimeout(() => {
				setMessage('');
				dispatch({ type: CREATE_STORE_FAIL, payload: 'no error' });
			}, 4000);
		}
		if (!user) {
			history.push('/login?redirect=profile');
		}
	}, [user, history, success, dispatch]);
	return isLoading || loadingDetails || loadingUpdate ? (
		<Loader />
	) : (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<h3 className="d-flex align-items-center">
						<QueuePlayNextIcon
							style={{ marginRight: '10px', transform: 'scale(1.1)' }}
						/>
						Store
					</h3>
					{message && <Message variant="success">{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
					{errorDetails && <Message variant="danger">{errorDetails}</Message>}
					{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
					<Form onSubmit={handleSubmit}>
						{couponId ? (
							<>
								<Form.Group controlId="postalCode">
									<Form.Label>Coupon Code</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Enter Coupone Code"
										value={coupon}
										onChange={(e) => setCoupon(e.target.value)}></Form.Control>
								</Form.Group>
								<Form.Group controlId="postalCode">
									<Form.Label>Discount (%)</Form.Label>
									<Form.Control
										required
										type="number"
										placeholder="Enter Discount (%)"
										value={discount}
										onChange={(e) =>
											setDiscount(e.target.value)
										}></Form.Control>
								</Form.Group>
							</>
						) : (
							<>
								<Form.Group controlId="address">
									<Form.Label>Name</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Enter Name of your store"
										value={name}
										onChange={(e) => setName(e.target.value)}></Form.Control>
								</Form.Group>
								<Form.Group controlId="address">
									<Form.Label>Email</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Enter Business Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}></Form.Control>
								</Form.Group>
								<Form.Group controlId="address">
									<Form.Label>Contact</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Enter Contact"
										value={contact}
										onChange={(e) => setContact(e.target.value)}></Form.Control>
								</Form.Group>
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
										type="text"
										placeholder="Enter postal code"
										value={postalCode}
										onChange={(e) =>
											setPostalCode(e.target.value)
										}></Form.Control>
								</Form.Group>
							</>
						)}

						<Button variant="primary" type="submit" className="btn-block">
							Continue
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default StoreEditScreen;
