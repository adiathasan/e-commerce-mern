import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./components/Home";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/product/:productId" component={ProductScreen}/>
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
