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
import SearchBox from './SearchBox';

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
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect className=" z4">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" exact style={{ textDecoration: "none" }}>
              <img src="/favicon.ico" className="favicon" alt="" />
              <span>K-Shop</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/>
            <Nav className="ml-md-auto pl-0">
              
               {
               user && user.isAdmin && (
                 <NavDropdown className="mx-auto border-bottom pb-1 "   title="Admin" id="admin-menu">
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
              {
                !user ? ( <NavLink
                to="/login"
                className="d-flex border-bottom pb-1 align-items-center justify-content-center ml-2 pr-4 mr-sm-0"
              >
                <AccountCircleIcon style={{ transform: "scale(.75)" }} />
                sign-In
              </NavLink>) : (
                 <NavDropdown className="mx-auto border-bottom pb-1 " title={user.name} id="username">
                    <NavDropdown.Item onClick={() => {
                      user ? history.push('/profile') : history.push('/login?redirect=profile')
                    }}>
                      profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Log-Out</NavDropdown.Item>
                 </NavDropdown>
              )
              }
            <NavLink
                
                to="/cart"
                className="d-flex align-items-center justify-content-center border-bottom pb-1   mx-auto  my-3 my-md-0 ml-md-2"
              >
                <sup>{getTotalCartItem(cartProducts)}</sup>
                <ShoppingCartOutlinedIcon style={{ transform: "scale(.75)" }} />
                cart
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
