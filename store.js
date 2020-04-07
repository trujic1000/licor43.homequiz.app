import { configureStore } from "@reduxjs/toolkit";
import { authReducer, langReducer } from "./slices";

export const initializeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			language: langReducer,
		},
	});
};
