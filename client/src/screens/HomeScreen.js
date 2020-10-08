import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { instance } from "../axios";
import Product from "../components/Product";

const HomeScreen = () => {
  const [_products, set_products] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      set_products(data);
    })();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {_products?.map((product) => {
          return (
            <Col key={product?._id} md={6} sm={12} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
