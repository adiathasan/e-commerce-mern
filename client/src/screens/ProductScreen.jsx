import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCartAction } from "../actions/cartActions";

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, message, isLoading } = useSelector(
    (state) => state.productDetail
  );
  const { cartProducts } = useSelector((state) => state.cartTotalItem);

  const checkDuplicateProduct = (cartProducts, id) => {
    const duplicate = cartProducts.filter((p) => {
      return p.cartProduct._id === id;
    });
    if (duplicate.length > 0) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCartAction(product, parseInt(quantity)));
    setIsDuplicate(true);
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
    checkDuplicateProduct(cartProducts, productId);
  }, [dispatch, productId]);

  return (
    <div className="productScreen">
      {isLoading ? (
        <Loader />
      ) : message ? (
        <Message variant={"danger"}>{message}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{product?.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product ? product.rating : 0}
                  text={product ? product.numReviews : 0}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product?.countInStock > 0
                          ? "In stock"
                          : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {product?.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty: </Col>
                      <Col>1</Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    className={`btn btn-block ${
                      !isDuplicate ? "btn-primary" : "btn-danger"
                    }`}
                    disabled={product?.countInStock === 0 || isDuplicate}
                    onClick={handleAddToCart}
                  >
                    {isDuplicate ? "Added to cart" : "Add to cart"}
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
