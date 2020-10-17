import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating.jsx";

const Product = ({ product, store }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={store ? `/admin/product/${product?._id}/edit/`: `/product/${product?._id}`}>
          <Card.Img src={product?.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product?._id}`}>
            <Card.Title as="div">
              <strong>{product?.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating rating={product?.rating} text={`${product.numReviews}`} />
          </Card.Text>
          <Card.Text as="h3">${product?.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
