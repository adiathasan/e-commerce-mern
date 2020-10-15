import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const SearchBox = () => {
	const history = useHistory();
	const [keyword, setKeyword] = useState('');
	const handleSearch = (keyword) => {
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};
	return (
		<Form
			onSubmit={handleSubmit}
			inline
			className="d-flex flex-grow-1 justify-content-center justify-content-md-start align-items-center my-3 mb-md-0">
			<Form.Control
				name="q"
				placeholder="Search Product..."
				className="mr-sm-2 rounded py-0"
				type="text"
				style={{ marginTop: '-14px' }}
				onChange={(e) => {
					setKeyword(e.target.value);
					handleSearch(e.target.value);
				}}></Form.Control>
			<Button
				type="submit"
				variant="outline-info"
				style={{ marginTop: '-14px' }}
				className="p-2 rounded d-none d-lg-inline">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
