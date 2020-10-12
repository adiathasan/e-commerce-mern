import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { Link, useHistory } from 'react-router-dom';
import { userRegisterAction } from '../actions/userActions.js';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [errMsg, setErrMsg] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const { isLoading, message } = useSelector((state) => state.userRegister);
	const {  user } = useSelector((state) => state.userInfo);

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	} 
	const handleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	} 

	useEffect(() => {
		if (user) {
			history.push('/');
		}
	}, [user, history]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if(password === confirmPassword){
			setErrMsg(null)
			dispatch(userRegisterAction(name, email, password));
		}else{
			setErrMsg("please confirm with correct password")
		}
	};

	return isLoading ? (
		<Loader />
	) : (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<h1>Register</h1>
					{message && <Message variant="danger">{message}</Message>}
					{errMsg && <Message variant="danger">{errMsg}</Message>}
					<Form onSubmit={handleSubmit}>
						<Form.Group >
							<Form.Label>Name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Enter Name"
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}></Form.Control>
								<Form.Label>Password</Form.Label>
								<div className="d-flex align-items-center justify-content-center">
									<Form.Control
										required
										type={showPassword ? "text": "password"}
										placeholder="Enter Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}></Form.Control>
								{
									showPassword ? <VisibilityOffIcon onClick={handleShowPassword}/> : <VisibilityIcon onClick={handleShowPassword}/>
								}
								</div>
									<Form.Label>Confirm password</Form.Label>
							
							<div className="d-flex align-items-center justify-content-center">
								<Form.Control
								required
								type={showConfirmPassword ? "text": "password"}
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
								{
									showConfirmPassword ? <VisibilityOffIcon onClick={handleShowConfirmPassword}/> : <VisibilityIcon onClick={handleShowConfirmPassword}/>
								}
							</div>
							<Button
								variant="primary"
								type="submit"
								className="mt-2 btn-block">
								Register
							</Button>
						</Form.Group>
					</Form>
					<Row className="py-3">
						<Col>
							Already have an account ? <Link to="/login">Sign-In</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default RegisterScreen;
