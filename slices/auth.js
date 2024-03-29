import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "~/api/authAPI";

let initialState = {
	isAuthenticated: false,
	user: {},
	error: null,
	loading: "idle",
};

export const register = createAsyncThunk(
	"auth/register",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await authAPI.register(data);
			// Set token to local storage
			localStorage.setItem("token", response.access_token);
			localStorage.setItem("token_expiration", response.expires_at);
			// Get currently logged in user
			const user = await authAPI.loadUser();
			router.push("/rules");
			return user;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await authAPI.login(data);
			// Set token to local storage
			localStorage.setItem("token", response.access_token);
			localStorage.setItem("token_expiration", response.expires_at);
			// Get currently logged in user
			const user = await authAPI.loadUser();
			router.push("/rules");
			return user;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const facebookLogin = createAsyncThunk(
	"auth/login",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await authAPI.facebookLogin({
				accessToken: data.accessToken,
				language: data.language,
			});
			// Set token to local storage
			localStorage.setItem("token", response.access_token);
			localStorage.setItem("token_expiration", response.expires_at);
			// Get currently logged in user
			router.push("/rules");
			return data;
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const loadUser = createAsyncThunk(
	"auth/loadUser",
	async (undefined, { rejectWithValue, dispatch }) => {
		try {
			const response = await authAPI.loadUser();
			dispatch(setCurrentUser(response));
			router.push("/rules");
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
			state.error = action.payload;
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
				state.error = null;
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
				state.error = {
					message: "Authentication failed",
				};
			}
		},
		[register.pending]: (state, action) => {
			if (state.loading === "idle") {
				state.loading = "pending";
				state.error = null;
			}
		},
		[register.fulfilled]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.isAuthenticated = true;
				state.user = action.payload;
			}
		},
		[register.rejected]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = {
					message: "This email has already been taken",
				};
			}
		},
	},
});

export const { setCurrentUser, logoutUser, authFailed } = auth.actions;
export default auth.reducer;
