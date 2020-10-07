import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">
            <img src="/favicon.ico" className="favicon" alt="" />
            <span style={{ color: " #00d9ff" }}>K-Shop</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                href="/cart"
                className="d-flex align-items-center justify-content-center"
              >
                <ShoppingCartOutlinedIcon style={{ transform: "scale(.75)" }} />
                cart
              </Nav.Link>
              <Nav.Link
                href="#link"
                className="d-flex align-items-center justify-content-center"
              >
                <AccountCircleIcon style={{ transform: "scale(.75)" }} />
                sign-In
              </Nav.Link>
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
