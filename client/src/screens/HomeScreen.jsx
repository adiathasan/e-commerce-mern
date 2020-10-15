import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useParams } from 'react-router-dom';
import PaginationComponent from '../components/Pagination.js'
const HomeScreen = () => {
  const dispatch = useDispatch();
  const {keyword, pageNumber} = useParams()
  const { products, isLoading, message, page, pages } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(getProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pageNumber, keyword]);
  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : message ? (
        <Message variant={"danger"}>{message}</Message>
      ) : (
        <>
        <Row>
          {products.length !== 0 ? products?.map((product) => {
            return (
              <Col key={product?._id} md={6} sm={12} lg={4} xl={3}>
                <Product product={product} />
               
              </Col>
            );
          }): <Col><h3 style={{color: "orangered", transition: 'ease-in-out .4s'}}>Opps! product Not Found on search.</h3></Col>}
        </Row>
        <Row>
           <PaginationComponent page={page} pages={pages}/>
        </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
