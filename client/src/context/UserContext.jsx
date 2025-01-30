import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };

		case "LOGOUT":
			return { user: null };

		default:
			return state;
	}
};

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, {
		user: null,
	});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem("jwt");
				const response = await axios.get(
					"https://organizeme-7l2v.onrender.com/api/users/check-auth",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				// console.log(response.data);
				if (response.data.success) {
					dispatch({ type: "LOGIN", payload: response.data.user });
				}
			} catch (error) {
				console.log("Unauthorized");
			}
		};

		checkAuth();
	}, [dispatch]);

	// console.log(state);
	return (
		<UserContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
