import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import {
	getOrdersAdminAction,
	deliverOrderAction,
} from '../actions/orderActions.js';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { ORDER_DELIVER_RESET } from '../CONSTANTS.js';
const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { orders, isLoading, message } = useSelector(
		(state) => state.getOrdersAdmin
	);
	const { user } = useSelector((state) => state.userInfo);
	const {
		success: successDeliver,
		isLoading: loadingDeliver,
		message: errorDeliver,
	} = useSelector((state) => state.orderDeliver);

	const handleDeliveredChecked = (orderId) => {
		dispatch(deliverOrderAction(orderId));
	};
	useEffect(() => {
		dispatch({ type: ORDER_DELIVER_RESET });
		if (!user.isAdmin) {
			history.push('/login');
		} else {
			dispatch(getOrdersAdminAction());
		}
	}, [dispatch, user, history, successDeliver]);
	return (
		<>
			<Row>
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>
			{isLoading || loadingDeliver ? (
				<Loader />
			) : message ? (
				<Message variant="danger">{message}</Message>
			) : errorDeliver ? (
				<Message variant="danger">{errorDeliver}</Message>
			) : (
				<Table className="table-sm" striped hover responsive bordered>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOATAL PRICE</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>MARK AS DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<ClearIcon style={{ color: 'red' }} />
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<ClearIcon style={{ color: 'red' }} />
									)}
								</td>

								<td>
									{!order.isDelivered ? (
										<Button
											variant="primary"
											onClick={() => handleDeliveredChecked(order._id)}
											className="btn-sm">
											<CheckIcon />
										</Button>
									) : (
										'Delivered'
									)}
								</td>
								<td>
									<Button
										variant="light"
										onClick={() => {
											history.push('/order/' + order._id);
										}}
										className="btn-sm">
										Details
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
