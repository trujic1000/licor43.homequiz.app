import { createSlice } from "@reduxjs/toolkit";

const language = createSlice({
	name: "language",
	initialState: { current: "english" },
	reducers: {
		setLanguage: (state, action) => {
			state.current = action.payload;
		},
	},
});

export const { setLanguage } = language.actions;
export default language.reducer;
