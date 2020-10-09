import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, isLoading, message } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : message ? (
        <Message variant={"danger"}>{message}</Message>
      ) : (
        <Row>
          {products?.map((product) => {
            return (
              <Col key={product?._id} md={6} sm={12} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
