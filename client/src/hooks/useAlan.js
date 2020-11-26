import alanBtn from '@alan-ai/alan-sdk-web';
import { useCallback, useEffect, useState } from 'react';
import {
	ADD_ITEM_TO_CART,
	OPEN_CART,
	OPEN_HOME,
	REMOVE_ITEM_FROM_CART,
	RESET_COMMANDS,
	PROCEED_TO_CHECK_OUT,
	OPEN_PROFILE,
} from '../CONSTANTS';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../actions/cartActions';

const useAlan = () => {
	const [alan, setAlan] = useState(null);

	const { openCart, openHome } = useSelector((state) => state.alanCommands);

	const { products } = useSelector((state) => state.productList);

	const { user } = useSelector((state) => state.userInfo);

	const { cartProducts } = useSelector((state) => state.cartTotalItem);

	const dispatch = useDispatch();

	const openHomeFunc = useCallback(() => {
		if (alan) alan.playText('going to Home page');
		dispatch({ type: OPEN_HOME });
		setTimeout(() => {
			dispatch({ type: RESET_COMMANDS });
		}, 1000);
	}, [alan, dispatch]);

	const openCheckOutFunc = () => {
		if (alan) {
			if (user) {
				dispatch({ type: PROCEED_TO_CHECK_OUT });
				setTimeout(() => {
					dispatch({ type: RESET_COMMANDS });
				}, 1000);
				alan.playText('proceeding to checkout');
			} else {
				alan.playText('Please sign in first');
			}
		}
	};

	const openProfileFunc = () => {
		if (alan) {
			if (user) {
				dispatch({ type: OPEN_PROFILE });
				setTimeout(() => {
					dispatch({ type: RESET_COMMANDS });
				}, 1000);
				alan.playText('going to profile');
			} else {
				alan.playText('Please sign in first');
			}
		}
	};

	const openCartFunc = useCallback(() => {
		if (alan) alan.playText('(opening the|going to) cart');
		dispatch({ type: OPEN_CART });
		setTimeout(() => {
			dispatch({ type: RESET_COMMANDS });
		}, 1000);
	}, [alan, dispatch]);

	// add item to cart

	const addCartFunc = ({ detail }) => {
		if (alan) {
			const regex = new RegExp(detail, 'ig');

			const foundItem = products.find((product) => {
				return regex.test(product.name.toLowerCase());
			});

			if (foundItem) {
				const alreadyInCart = cartProducts.find((p) =>
					regex.test(p.cartProduct.name.toLowerCase())
				);
				if (alreadyInCart) {
					alan.playText(`${detail} already in the cart`);
				} else {
					alan.playText(`${detail} added to cart`);
					dispatch(addToCartAction(foundItem, 1));
				}
			} else {
				alan.playText(`Can not find ${detail}, sorry!`);
			}
		}
	};

	// remove item from cart

	const removeCartFunc = ({ detail }) => {
		if (alan) {
			const regex = new RegExp(detail, 'ig');
			const foundItem = cartProducts.find((product) => {
				return regex.test(product.cartProduct.name.toLowerCase());
			});

			if (foundItem) {
				alan.playText(`${detail} removed from cart`);
				dispatch(removeFromCartAction(foundItem.cartProduct));
			} else {
				alan.playText(`Coudn't find ${detail} in cart`);
			}
		}
	};

	useEffect(() => {
		window.addEventListener(OPEN_CART, openCartFunc);
		window.addEventListener(OPEN_HOME, openHomeFunc);
		window.addEventListener(ADD_ITEM_TO_CART, addCartFunc);
		window.addEventListener(REMOVE_ITEM_FROM_CART, removeCartFunc);
		window.addEventListener(PROCEED_TO_CHECK_OUT, openCheckOutFunc);
		window.addEventListener(OPEN_PROFILE, openProfileFunc);

		return () => {
			window.removeEventListener(OPEN_CART, openCartFunc);
			window.removeEventListener(OPEN_HOME, openHomeFunc);
			window.removeEventListener(ADD_ITEM_TO_CART, addCartFunc);
			window.removeEventListener(REMOVE_ITEM_FROM_CART, removeCartFunc);
			window.removeEventListener(PROCEED_TO_CHECK_OUT, openCheckOutFunc);
			window.removeEventListener(OPEN_PROFILE, openProfileFunc);
		};
	}, [openCart, openHome, addCartFunc]);

	useEffect(() => {
		if (alan) return;
		setAlan(
			alanBtn({
				key: process.env.REACT_APP_ALAN_KEY,
				onCommand: ({ command, item }) => {
					window.dispatchEvent(new CustomEvent(command, { detail: item }));
				},
			})
		);
	}, []);

	return { alan };
};

export default useAlan;
