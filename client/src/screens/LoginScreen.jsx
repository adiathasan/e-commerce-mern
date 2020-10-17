import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from "../components/Message.jsx"
import Loader from "../components/Loader.jsx"
import {Link, useHistory} from 'react-router-dom'
import { userLoginAction } from '../actions/userActions.js'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Helmet} from 'react-helmet'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
	const [showPassword, setShowPassword] = useState(false);
    const {isLoading, message, user} = useSelector(state => state.userInfo)
	const handleShowPassword = () => {
		setShowPassword(!showPassword)
    } 
        console.log();
    const redirect = history.location.search !== '' ? history.location.search.split("=")[1] : '/'
    useEffect(()=> {
        if(user){
            history.push(redirect)
        }
    }, [user, history, redirect])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLoginAction(email, password))
    }

    return (
            
                isLoading ? <Loader/> :  <Container>
              
            <Row className="justify-content-md-center">
                    <Helmet>
                        <title>Khulna-Shop | Login</title>
                    </Helmet>
                <Col xs={12} md={6}>
                    <h1>Sigh-In</h1>
                    {
                        message && <Message variant="danger">{message}</Message>
                    }
                   
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                <Form.Group controlId="password">

                    <Form.Label>
                        Password
                    </Form.Label>
                    <div className="d-flex align-items-center justify-content-center">
                        <Form.Control
                            required
                            type={showPassword ? "text": "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                            {
                                showPassword ? <VisibilityOffIcon onClick={handleShowPassword}/> : <VisibilityIcon onClick={handleShowPassword}/>
                            }
                    </div>
                </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2 btn-block">Sign-In</Button>
                    
                </Form.Group>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer ? <Link to="/signup">Register</Link> 
                </Col>
                <Col>
                  want to create store ? <Link to="/signup?redirect=createstore">Register first</Link> 
                </Col>
            </Row>
                </Col>
            </Row>
        </Container>  
            
        

    )
}

export default LoginScreen
