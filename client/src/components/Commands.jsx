import React from 'react';

const Commands = () => {
	return (
		<div className='commands'>
			<ul>
				<li>
					<span>https://domain/</span> command - go to home.
				</li>
				<li>
					<span>https://domain/profile</span> command - go to profile.
				</li>
				<li>
					<span>https://domain/cart</span> command - go to cart | open cart.
				</li>
				<li>
					<span>https://domain/shipping</span> command - go | proceed to
					checkout.
				</li>
				<li>
					<span>Adding to cart</span> command - add [FULL NAME OF PRODUCT] to
					cart.
				</li>
				<li>
					<span>Removing from cart</span> command - remove [FULL NAME OF
					PRODUCT] from cart.
				</li>
			</ul>
			<p>commands</p>
		</div>
	);
};

export default Commands;
