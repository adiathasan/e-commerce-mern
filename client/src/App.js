import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./components/Home";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" exact>
                <HomeScreen />
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
