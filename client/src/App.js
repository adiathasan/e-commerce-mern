import React from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { Container } from "react-bootstrap";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from './screens/LoginScreen.jsx';

const App = () => {
  return (
		<>
			<Router>
				<Header />
				<main className="py-3">
					<Container>
						<Switch>
							<Route path="/" exact component={HomeScreen} />
							<Route path="/product/:productId" component={ProductScreen} />
							<Route path="/cart/:productId?" component={CartScreen} />
							<Route path="/login" component={LoginScreen} />
						</Switch>
					</Container>
				</main>
				<Footer />
			</Router>
		</>
	);
};

export default App;
