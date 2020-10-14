import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer  } from "react-router-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCartItem } from "../reducers/cartReducers";
import { userLogoutAction } from "../actions/userActions";
import { MY_ORDER_RESET, USERS_LIST_RESET } from '../CONSTANTS';

const Header = () => {
  const history = useHistory()
  const { cartProducts } = useSelector((state) => state.cartTotalItem);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch()

  const handleLogout = e => {
    dispatch({
      type: USERS_LIST_RESET
    })
    dispatch({
      type: MY_ORDER_RESET
    })
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
                    <NavDropdown.Item onClick={() => {
                      user ? history.push('/profile') : history.push('/login?redirect=profile')
                    }}>
                      profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Log-Out</NavDropdown.Item>
                 </NavDropdown>
              )
              }
             {
               user && user.isAdmin && (
                 <NavDropdown  title="Admin" id="admin-menu">
                   <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                   </LinkContainer>
                   <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                   </LinkContainer>
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
