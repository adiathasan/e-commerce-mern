import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createCouponAction,
	createStoreAction,
	getSingleStore,
	updateCouponAction,
	updateStoreAction,
} from '../actions/storeActions';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import Message from '../components/Message';
import {
	CREATE_COUPON_RESET,
	CREATE_STORE_FAIL,
	UPDATE_COUPON_RESET,
	UPDATE_STORE_RESET,
} from '../CONSTANTS';
import Loader from '../components/Loader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
	const [active, setActive] = useState(false);

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
		couponDiscount,
		couponStatus,
		createCoupon,
	] = history.location.search ? history.location.search.split('=') : null;

	const {
		success: successCouponUpdate,
		isLoading: loadingCouponUpdate,
		message: errorCouponUpdate,
	} = useSelector((state) => state.updateCoupon);

	const {
		success: successCouponCreate,
		isLoading: loadingCouponCreate,
		message: errorCouponCreate,
	} = useSelector((state) => state.createCoupon);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (createCoupon) {
			dispatch(
				createCouponAction(storeId, {
					token: coupon,
					discount,
					isActive: active,
				})
			);
		} else {
			if (couponId) {
				dispatch(
					updateCouponAction(storeId, couponId, {
						token: coupon,
						discount,
						isActive: active,
					})
				);
			} else {
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
			}
		}
	};
	useEffect(() => {
		setDiscount(couponDiscount);
		setCoupon(couponToken);
		setActive(couponStatus === 'false' ? false : true);
	}, [couponToken, couponDiscount, couponStatus]);
	useEffect(() => {
		if (successCouponCreate) {
			history.push('/store/admin/' + storeId);
			setTimeout(() => {
				dispatch({ type: CREATE_COUPON_RESET });
			}, 1000);
		}
		if (successCouponUpdate) {
			setMessage('Coupon Updated Successfully');
			dispatch({ type: UPDATE_COUPON_RESET });
			setTimeout(() => {
				setMessage(null);
			}, 4000);
		}
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
	}, [
		dispatch,
		storeId,
		successUpdate,
		searchParams,
		successCouponUpdate,
		successCouponCreate,
		history,
	]);
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
	return isLoading ||
		loadingDetails ||
		loadingUpdate ||
		loadingCouponUpdate ||
		loadingCouponCreate ? (
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
					{errorCouponUpdate && (
						<Message variant="danger">{errorCouponUpdate}</Message>
					)}
					{errorCouponCreate && (
						<Message variant="danger">{errorCouponCreate}</Message>
					)}
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
								Set Active
								{active ? (
									<CheckCircleIcon onClick={() => setActive(!active)} />
								) : (
									<RadioButtonUncheckedIcon
										onClick={() => setActive(!active)}
									/>
								)}
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
