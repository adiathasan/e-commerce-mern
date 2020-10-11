import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCartItem } from "../reducers/cartReducers";
import { userLogoutAction } from "../actions/userActions";

const Header = () => {
  const { cartProducts } = useSelector((state) => state.cartTotalItem);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch()

  const handleLogout = e => {
    dispatch(userLogoutAction())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
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
                <sup>{getTotalCartItem(cartProducts)}</sup>
                <ShoppingCartOutlinedIcon style={{ transform: "scale(.75)" }} />
                cart
              </NavLink>
              {
                !user ? ( <NavLink
                to="/login"
                className="d-flex align-items-center justify-content-center"
              >
                <AccountCircleIcon style={{ transform: "scale(.75)" }} />
                sign-In
              </NavLink>) : (
                 <NavDropdown title={user.name} id="username">
                    <NavDropdown.Item>
                   <Link to="/profile" style={{color: 'black'}}>
                      profile
                   </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Log-Out</NavDropdown.Item>
                 </NavDropdown>
              )
              }
             
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
