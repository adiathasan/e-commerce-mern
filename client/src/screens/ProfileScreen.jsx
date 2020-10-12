import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction, updateUserDetailsAction } from '../actions/userActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
	const [errMsg, setErrMsg] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const { isLoading, message, userProfile } = useSelector((state) => state.userDetails);
    const {  user } = useSelector((state) => state.userInfo);
    const {  success } = useSelector((state) => state.userUpdate);

    const handleShowPassword = () => {
		setShowPassword(!showPassword)
	} 
	const handleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
    } 
    
    const handleSubmit = (e) => {
		e.preventDefault();
		if(password === confirmPassword){
            setErrMsg(null)
            dispatch(updateUserDetailsAction({_id: user._id, name, email, password}))
		}else{
			setErrMsg("please confirm with correct password")
		}
    };

	useEffect(() => {
		if (!user) {
			history.push('/login?redirect=profile');
		}else{
            if(!userProfile){
                dispatch(getUserDetailsAction('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
	}, [user, dispatch, userProfile, history]);
    
    return  isLoading ? (
		<Loader />
	) : (
			<Row className="justify-content-md-center">
				<Col md={5} >
					<h2>User Profile</h2>
					{message && <Message variant="danger">{message}</Message>}
					{errMsg && <Message variant="danger">{errMsg}</Message>}
					{success && <Message variant="success">{"Profile Updated"}</Message>}
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
								Update
							</Button>
						</Form.Group>
					</Form>		
				</Col>
                <Col md={7}></Col>
			</Row>

	);
}

export default ProfileScreen
