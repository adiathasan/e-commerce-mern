import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { addToCartAction, removeFromCartAction } from "../actions/cartActions";
import { getTotalCartItem, getTotalCartPrice } from "../reducers/cartReducers";
import {Helmet} from 'react-helmet'


const CartScreen = ({history}) => {
  const { cartProducts } = useSelector((state) => state.cartTotalItem);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const handleCartQty = (item, qty) => {
    dispatch(addToCartAction(item, qty));
  };

  const handleCheckoutBtn = () => {
    if(!user){
      history.push('/login?redirect=shipping')
    }else{
      history.push('/shipping')
    }
} 


  const handleRemoveItem = (product) => {
    dispatch(removeFromCartAction(product));
  };
  return (
    <Row>
      <Helmet>
        <title>{`Khulna-Shop | cart(${getTotalCartItem(cartProducts)})`}</title>
      </Helmet>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartProducts.length === 0 ? (
          <Message variant={"primary"}>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartProducts.map((item) => (
              <ListGroupItem key={item.cartProduct._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.cartProduct.image}
                      fluid
                      alt={item.cartProduct.name}
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={"/product/" + item.cartProduct._id}>
                      {item.cartProduct.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.cartProduct.price}</Col>
                  <Col md={3}>
                    <Form
                      value={item.amount}
                      className="btn btn-light btn-outline-primary btn-block"
                      as="select"
                      onChange={(e) =>
                        handleCartQty(
                          item.cartProduct,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      {[...Array(item.cartProduct.countInStock).keys()].map(
                        (num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        )
                      )}
                    </Form>
                  </Col>
                  <Col md={2}>
                    <Button
                      onClick={() => handleRemoveItem(item.cartProduct)}
                      // variant="dark"
                      className="btn-block btn-danger text-center"
                    >
                      <DeleteForeverIcon style={{ transform: "scale(.8)" }} />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>
                Subtotal ({getTotalCartItem(cartProducts)}){" "}
                {getTotalCartItem(cartProducts) > 1 ? "items" : "item"}
              </h4>
              ${getTotalCartPrice(cartProducts).toFixed(2)}
            </ListGroupItem>
          </ListGroup>
          <ListGroupItem>
            <Button
              className="btn-block"
              onClick={handleCheckoutBtn}
              disabled={getTotalCartItem(cartProducts) === 0}
            >
              Procced To Checkout
            </Button>
          </ListGroupItem>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};
export default CartScreen;
