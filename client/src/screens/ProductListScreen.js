import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import {
	getProductsAction,
	deleteProductAction,
	createProductAction,
} from '../actions/productActions.js';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { PRODUCT_CREATE_RESET } from '../CONSTANTS.js';
import PaginationComponent from '../components/Pagination.js';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const { pageNumber } = useParams();

	const { products, isLoading, message, pages, page } = useSelector(
		(state) => state.productList
	);
	const {
		success: successDelete,
		isLoading: loading,
		message: error,
	} = useSelector((state) => state.productDelete);
	const { user } = useSelector((state) => state.userInfo);
	const {
		success: successCreate,
		isLoading: loadingCreate,
		message: errorCreate,
		product: createdProduct,
	} = useSelector((state) => state.productCreate);
	const handleDelete = (productId) => {
		if (window.confirm('Are You Sure?')) {
			dispatch(deleteProductAction(productId));
		}
	};
	const handleCreateProduct = () => {
		dispatch(createProductAction());
	};
	useEffect(() => {
		dispatch({
			type: PRODUCT_CREATE_RESET,
		});
		if (!user.isAdmin) {
			history.push('/login');
		}
		if (successCreate) {
			history.push('/admin/product/' + createdProduct._id + '/edit');
		} else {
			dispatch(getProductsAction('', pageNumber));
		}
	}, [
		dispatch,
		user,
		history,
		successDelete,
		error,
		successCreate,
		createdProduct,
		pageNumber,
	]);
	return (
		<>
			<Row>
				<Helmet>
					<title>Khulna-Shop | All Products</title>
				</Helmet>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="d-flex justify-content-sm-end">
					<Button
						className=" align-items-center mb-4 btn-sm"
						onClick={() => handleCreateProduct()}>
						<AddIcon style={{ color: 'lightblue', transform: 'scale(.85)' }} />{' '}
						Create Product
					</Button>
				</Col>
			</Row>
			{isLoading || loading || loadingCreate ? (
				<Loader />
			) : message ? (
				<Message variant="danger">{message}</Message>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : errorCreate ? (
				<Message variant="danger">{errorCreate}</Message>
			) : (
				<>
					<Table className="table-sm" striped hover responsive bordered>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>

									<td>
										<LinkContainer
											to={'/admin/product/' + product._id + '/edit'}>
											<Button variant="light" className="btn-sm">
												<EditOutlinedIcon
													style={{
														color: 'lightblue',
														transform: 'scale(.85)',
													}}
												/>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											onClick={() => handleDelete(product._id)}
											className="btn-sm">
											<DeleteIcon />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<PaginationComponent pages={pages} page={page} isAdmin />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
