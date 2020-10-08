import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <NavLink to="/" exact style={{ textDecoration: "none" }}>
              <img src="/favicon.ico" className="favicon" alt="" />
              <span>K-Shop</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink
                style={{ marginRight: "1rem" }}
                to="/cart"
                className="d-flex align-items-center justify-content-center"
              >
                <sup>0</sup>
                <ShoppingCartOutlinedIcon style={{ transform: "scale(.75)" }} />
                cart
              </NavLink>
              <NavLink
                // style={{ textDecoration: "none", color: "lightgray" }}
                to="/sign-in"
                className="d-flex align-items-center justify-content-center"
              >
                <AccountCircleIcon style={{ transform: "scale(.75)" }} />
                sign-In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// "@testing-library/jest-dom": "^4.2.4",
// "@testing-library/react": "^9.3.2",
// "@testing-library/user-event": "^7.1.2",
