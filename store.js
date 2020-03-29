import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

export const initializeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer
		}
	});
};
