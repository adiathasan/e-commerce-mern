import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from "../components/Message.jsx"
import Loader from "../components/Loader.jsx"
import {Link, useHistory} from 'react-router-dom'
import { userLoginAction } from '../actions/userActions.js'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const {isLoading, message, user} = useSelector(state => state.userInfo)

    useEffect(()=> {
        if(user){
            history.push('/')
        }
    }, [user])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLoginAction(email, password))
    }

    return (
            
                isLoading ? <Loader/> :  <Container>
              
            <Row className="justify-content-md-center">
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
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control required type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                    <Button variant="primary" type="submit" className="mt-2 btn-block">Sign-In</Button>
                    
                </Form.Group>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer ? <Link to="/signup">Register</Link>
                </Col>
            </Row>
                </Col>
            </Row>
        </Container>  
            
        

    )
}

export default LoginScreen
