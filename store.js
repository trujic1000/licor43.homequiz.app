import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer, langReducer, quizReducer, playerReducer } from "./slices";

export const initializeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			language: langReducer,
			quiz: quizReducer,
			player: playerReducer,
		},
		middleware: getDefaultMiddleware({
			serializableCheck: false,
		}),
	});
};
