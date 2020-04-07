import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "~/api/authAPI";

let initialState = {
	isAuthenticated: false,
	user: {},
	error: null,
	loading: "idle",
};

const login = createAsyncThunk(
	"auth/login",
	async (data, { rejectWithValue }) => {
		try {
			const response = await authAPI.login(data);
			// Set token to local storage
			localStorage.setItem("token", response.access_token);
			localStorage.setItem("token_expiration", response.expires_at);
			const user = await authAPI.loadUser();
			// TODO: Router push to /rules
			return user;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		authFailed: (state, action) => {
			state.isAuthenticated = false;
			state.user = {};
			state.errors = action.payload;
		},
		logoutUser: (state) => {
			// Remove token from local storage
			localStorage.removeItem("token");
			// Set isAuthenticated to false and user to {}
			state.isAuthenticated = false;
			state.user = {};
		},
	},
	extraReducers: {
		[login.pending]: (state, action) => {
			if (state.loading === "idle") {
				state.loading = "pending";
			}
		},
		[login.fulfilled]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.isAuthenticated = true;
				state.user = action.payload;
			}
		},
		[login.rejected]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = action.error;
			}
		},
	},
});

export const { setCurrentUser, logoutUser, authFailed } = auth.actions;
export default auth.reducer;
