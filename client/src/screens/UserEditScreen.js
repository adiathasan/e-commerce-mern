import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
	getUserDetailsAction,
	updateUserDetailsFromAdminAction,
} from '../actions/userActions.js';
import { USER_UPDATE_RESET } from '../CONSTANTS.js';

const UserEditScreen = () => {
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const { userId } = useParams();
	const { userProfile, isLoading } = useSelector((state) => state.userDetails);
	const { isLoading: loading, message, success } = useSelector(
		(state) => state.userUpdateFromAdmin
	);

	useEffect(() => {
		if (success) {
			dispatch({
				type: USER_UPDATE_RESET,
			});
			history.push('/admin/users');
		} else {
			if (!userProfile || userProfile._id !== userId) {
				dispatch(getUserDetailsAction(userId));
			} else {
				setName(userProfile.name);
				setEmail(userProfile.email);
				setIsAdmin(userProfile.isAdmin);
			}
		}
	}, [history, userId, userProfile, success, dispatch]);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateUserDetailsFromAdminAction(
				{
					name,
					email,
					isAdmin,
				},
				userId
			)
		);
	};

	return isLoading || loading ? (
		<Loader />
	) : message ? (
		<Message variant="danger">{message}</Message>
	) : (
		<>
			<Link to="/admin/users" className="btn btn-light m-y">
				Go back
			</Link>
			<Container>
				<Row className="justify-content-md-center">
					<Col xs={12} md={6}>
						<h1>Edit User</h1>

						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) => setName(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									type="email"
									placeholder="Enter Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}></Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Check
									checked={isAdmin}
									type="checkbox"
									label="Is Admin"
									onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
							</Form.Group>
							<Button
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

export default UserEditScreen;
