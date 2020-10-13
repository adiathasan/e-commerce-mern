import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import {
	deletetUserAction,
	getUsersListAction,
} from '../actions/userActions.js';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { users, isLoading, message } = useSelector(
		(state) => state.getUsersList
	);
	const deleteUser = useSelector((state) => state.deleteUser);
	const { successMessage } = deleteUser;
	const { user } = useSelector((state) => state.userInfo);
	const handleDelete = (userId) => {
		if (window.confirm('Are You Sure?')) {
			dispatch(deletetUserAction(userId));
		}
	};
	useEffect(() => {
		if (user && user.isAdmin) {
			dispatch(getUsersListAction());
		} else {
			history.push('/login');
		}
	}, [dispatch, user, history, successMessage]);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : message ? (
				<Message variant="danger">{message}</Message>
			) : (
				<Table className="table-sm" striped hover responsive bordered>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<CheckOutlinedIcon
											style={{ color: 'green', transform: 'scale(.85)' }}
										/>
									) : (
										<ClearOutlinedIcon
											style={{ color: 'red', transform: 'scale(.85)' }}
										/>
									)}
								</td>
								<td>
									<LinkContainer to={'/admin/user/' + user._id + '/edit'}>
										<Button variant="light" className="btn-sm">
											<EditOutlinedIcon
												style={{ color: 'lightblue', transform: 'scale(.85)' }}
											/>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										onClick={() => handleDelete(user._id)}
										className="btn-sm">
										<DeleteIcon />
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

export default UserListScreen;
