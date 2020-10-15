import React from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { Container } from 'react-bootstrap';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentMethodScreen from './screens/PaymentMethodScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Switch>
						<Route path="/search/:keyword" exact component={HomeScreen} />
						<Route
							path="`/search/:keyword/page/:pageNumber"
							exact
							component={HomeScreen}
						/>
						<Route path="/page/:pageNumber" exact component={HomeScreen} />
						<Route path="/" exact component={HomeScreen} />
						<Route path="/product/:productId" component={ProductScreen} />
						<Route
							path="/admin/product/:productId/edit"
							component={ProductEditScreen}
						/>
						<Route
							path="/admin/products/:pageNumber"
							component={ProductListScreen}
							exact
						/>
						<Route path="/admin/products" component={ProductListScreen} exact />
						<Route path="/cart/:productId?" component={CartScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/signup" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/admin/users" component={UserListScreen} />
						<Route path="/admin/user/:userId/edit" component={UserEditScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentMethodScreen} />
						<Route path="/place-order" component={PlaceOrderScreen} />
						<Route path="/order/:orderId" component={OrderScreen} />
						<Route path="/admin/orders" component={OrderListScreen} />
					</Switch>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
