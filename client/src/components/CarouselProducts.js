import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCarouselAction } from '../actions/productActions.js';
const CarouselProducts = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productCarousel);
	useEffect(() => {
		dispatch(getProductsCarouselAction());
	}, [dispatch]);
	return (
		<Carousel pause="hover" className="bg-dark car">
			{products.map((product) => {
				return (
					<Carousel.Item key={product._id}>
						<Link
							to={`product/${product._id}`}
							className="d-flex align-items-center justify-content-center">
							<Image src={`${product.image}`} fluid alt={product.name} />
							<Carousel.Caption className=" carousel-caption">
								<h5>
									{product.name} (${product.price})
								</h5>
							</Carousel.Caption>
						</Link>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};

export default CarouselProducts;
