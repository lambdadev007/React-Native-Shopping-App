export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

import Order from '../../models/order';

const firebaseUrl = 'https://m-complete-guide-444a7.firebaseio.com';

export const fetchOrders = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		console.log('userId', userId);
		
		try {
			const response = await fetch(`${firebaseUrl}/orders/${userId}.json`);

			if (!response.ok) {
				throw new Error('Something went wrong with fetching the data from the server!');
			}
			const resData = await response.json();
			const loadedOrders = [];

			for (const key in resData) {
				loadedOrders.push(
					new Order(
						key,
						resData[key].cartItems,
						resData[key].totalAmount,
						// Just resData[key].date works too, but we need to get an object (!?)
						new Date(resData[key].date),
					)
				);
			}
			dispatch({
				type: SET_ORDERS,
				orders: loadedOrders
			});
		} catch (err) {
			// sent error to custom analytics server
			throw err;
		}
	};
};

export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const date = new Date();
		const response = await fetch(`${firebaseUrl}/orders/${userId}.json?auth=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cartItems,
				totalAmount,
				date: date.toISOString()
			})
		});

        if(!response.ok) {
            throw new Error('Something went wrong with adding the order on the server!')
        }
		const resData = await response.json();
		dispatch({
			type: ADD_ORDER,
			orderData: {
				id: resData.name,
				items: cartItems,
                amount: totalAmount,
                date: date
			}
		});
	};
};