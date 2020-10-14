import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const SearchBox = () => {
	const history = useHistory();
	// const [keyword, setKeyword] = useState('');
	const handleSearch = (keyword) => {
		// e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};
	return (
		<Form
			// onSubmit={handleSearch}
			inline
			className="d-flex flex-grow-1 justify-content-center justify-content-md-start w-100 align-items-center my-3 mb-md-0">
			<Form.Control
				name="q"
				placeholder="Search Product..."
				className="mr-sm-2 ml-sm-5 rounded"
				type="text"
				onChange={(e) => handleSearch(e.target.value)}></Form.Control>
			<Button
				type="submit"
				variant="outline-info"
				className="p-2 rounded d-none d-lg-inline">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
