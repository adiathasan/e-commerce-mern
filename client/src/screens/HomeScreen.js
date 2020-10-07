import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  const [_proucts, set_proucts] = useState([]);
  useEffect(() => {
    set_proucts(
      products?.map((product) => {
        return (
          <Col key={product?._id} md={6} sm={12} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        );
      })
    );
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>{_proucts}</Row>
    </>
  );
};

export default HomeScreen;
