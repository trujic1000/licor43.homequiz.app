import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const initializeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
		},
	});
};
