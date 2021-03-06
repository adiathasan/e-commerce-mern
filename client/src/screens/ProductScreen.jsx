import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form
} from "react-bootstrap";
import { useParams, Link, NavLink } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, createReviewProductAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCartAction } from "../actions/cartActions";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../CONSTANTS';
import {Helmet} from 'react-helmet'

const ProductScreen = ({history}) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [coupon, setCoupon] = useState('');
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, message, isLoading } = useSelector(
    (state) => state.productDetail
  );
  const {user} = useSelector(state => state.userInfo)
  const { message: errorReview, isLoading:loading, success } = useSelector(
    (state) => state.createProductReview
  );
  const { cartProducts } = useSelector((state) => state.cartTotalItem);

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [productId]);

  const handleSubmit = e => {
    e.preventDefault()
    if(comment === ''){
      dispatch({type: PRODUCT_CREATE_REVIEW_FAIL, message: 'provide a comment for rating'})
      setTimeout(()=> {
        dispatch({
          type: PRODUCT_CREATE_REVIEW_RESET
        })
      },3000)
    }else{
      dispatch(createReviewProductAction({comment, rating}, productId))
    }
  }
  
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
    dispatch(addToCartAction({...product, price: Number(discountPrice)}, 1));
    setIsDuplicate(true);
  };

  const handleCoupon = () => {
    const activeCoupon = product.store.coupons.filter(c => c.isActive && c.token === coupon)
    if(activeCoupon.length === 1){
      setDiscountPrice((product.price - (product.price * (activeCoupon[0].discount / 100))).toFixed(2))
    }else{
      setCouponMessage('Oops! coupon not valid')
      setTimeout(()=> {
        setCouponMessage(null)
      },4000)
    }
  };

  useEffect(()=> {
    checkDuplicateProduct(cartProducts, productId);
  }, [cartProducts, productId])

  useEffect(()=> {
    if(errorReview === 'Request failed with status code 400'){
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        message: 'Already reviewed'
      })
      
      setTimeout(()=> {
         dispatch({
           type: PRODUCT_CREATE_REVIEW_RESET
          })
        },3000)
      
      }
    }, [dispatch, errorReview])

    useEffect(() => {
    if(success){
      alert('Review Submitted')
      setComment('')
      setRating(0)
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET
      })
    }
    dispatch(getSingleProduct(productId));
    
  }, [dispatch, productId, success]);

  useEffect(()=> {
    product.store && setDiscountPrice(product.price)
  }, [product])

  return (
    <div className="productScreen">
        
      {isLoading || loading  ? (
        <Loader />
      ) : message ? (
        <Message variant={"danger"}>{message}</Message>
      ) : (
        <>
          <Row>
              <Helmet>
                <title>{'Khulna-Shop | ' + (product.name ?  product.name : '')}</title>
              </Helmet>
          <Col md={5}>
            <Button variant="light" onClick={()=> {
              history.push('/')
            }} className="d-flex align-items-center btn-block rounded-top"><KeyboardBackspaceIcon/>Go back</Button>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>{product?.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                STORE NAME: 
                <NavLink to={`/store/${product?.store?._id}`}>
                  <h5>{product?.store?.name}</h5>
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product ? product.rating : 0}
                  text={product ? product.numReviews : 0}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
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
                      <strong>${discountPrice}</strong>
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
                    <Row>
                      {/* <Col>Coupon: </Col>
                      <Col>
                      {
                          product.store?.coupons.map(coupon => {
                            if(coupon.isActive){
                             return <p key={coupon._id}>{coupon.token} ({coupon.discount}%)</p>
                            }
                          })[0]
                        }
                      </Col> */}
                      <Col>
                       <Form.Control
                       value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        placeholder='Your Coupon Here'
                        ></Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                   <ListGroupItem>
                  {
                    couponMessage && <Message variant="danger">{couponMessage}</Message>
                  }
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    className={`btn btn-block ${
                      !isDuplicate ? "btn-primary" : "btn-warning"
                    }`}
                    disabled={product?.countInStock === 0 || isDuplicate || discountPrice !== product.price}
                    onClick={handleCoupon}
                  >
                    { discountPrice === product.price ?  "Apply Coupon" : "Coupon Applied"}
                  </Button>
                </ListGroupItem>
               
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
        <Row>
          <Col md={5 } className="mt-md-0 m-3">
              <h2>Reviews</h2>
              {
                product?.reviews?.length === 0 && <Message>No Review Yet</Message>
              }
              <ListGroup variant="flush">
                {
                  product.reviews?.map(review => 
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review ? review.rating : 0}/>
                      <p>
                        {review.createdAt.substring(0, 10)}
                      </p>
                      <p>
                        {review.comment}
                      </p>
                    </ListGroupItem>
                  )
                }
                <ListGroupItem>
                  <h4>Write a customer review</h4>
              {errorReview && <Message variant="danger">{errorReview}</Message>}
                  {
                    user ? (
                    <Form  onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                          <option value="">Select..</option>
                          <option value="1">1 - poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value)}/>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="btn-block">Rate Product</Button>
                    </Form>) : 
                    <Message>Please <Link to={"/login?redirect=product/"+ product._id}>Sign-In</Link> to write a review</Message>
                  }
                </ListGroupItem>
              </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
