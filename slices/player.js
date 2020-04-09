import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: "",
	role: "",
	name: "",
};

const player = createSlice({
	name: "player",
	initialState,
	reducers: {
		setPlayer: (state, { payload }) => {
			state.id = payload.id;
			state.role = payload.role;
			state.name = payload.name;
		},
		setId: (state, { payload }) => {
			state.id = payload;
		},
	},
});

export const { setPlayer, setId } = player.actions;
export default player.reducer;
