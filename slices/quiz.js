import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import quizAPI from "~/api/quizAPI";
import { connectSocket } from "~/utils";
import { setPlayer } from "./player";

export const status = {
	CONNECTED: "CONNECTED",
	DISCONNECTED: "DISCONNECTED",
};

let initialState = {
	connectionStatus: status.DISCONNECTED,
	id: null,
	name: "",
	code: "",
	players: [],
	lobbyText: "waiting-for-the-game-to-start",
	categoryId: null,
	question: {},
	answer: "",
	answers: [],
	numberOfPlayers: 0,
	remainingVotes: null,
	remainingRounds: null,
	roundWinner: {},
	winner: null,
	ranking: [],
	loading: "idle",
	error: null,
};

export const createQuiz = createAsyncThunk(
	"quiz/create",
	async ({ data, router }, { rejectWithValue, dispatch }) => {
		try {
			const response = await quizAPI.createQuiz(data);
			const player = {
				id: "",
				role: "HOST",
				name: response.user.name,
			};
			dispatch(setPlayer(player));
			connectSocket({
				code: response.code,
				name: response.user.name,
				router,
				role: player.role,
				dispatch,
			});
			router.push("/invite");
			return {
				id: response.id,
				name: data.name,
				code: response.code,
			};
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const joinQuiz = createAsyncThunk(
	"quiz/join",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await quizAPI.joinQuiz(data);
			router.push("/guest-welcome");
			return {
				name: response.quiz_name,
				code: response.quiz_code,
			};
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

export const getQuestion = createAsyncThunk(
	"quiz/getQuestion",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await quizAPI.getQuestion(data);
			if (!response.questions) {
				toast(`No more questions in that category`, {
					type: toast.TYPE.ERROR,
				});
			} else {
				router.push("/question");
			}
		} catch (error) {
			return rejectWithValue(error.response);
		}
	}
);

const quiz = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		addPlayer: (state, action) => {
			state.players.push(action.payload);
			state.numberOfPlayers++;
		},
		removePlayer: (state, action) => {
			const index = state.players.findIndex(
				(player) => player.id === action.payload
			);
			state.players.splice(index, 1);
			state.numberOfPlayers--;
		},
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setQuestion: (state, action) => {
			state.question = action.payload;
		},
		nextQuestion: (state) => {
			state.lobbyText = "waiting-for-the-host-to-choose-a-new-category";
		},
		setConnectionStatus: (state, action) => {
			state.connectionStatus = action.payload;
		},
	},
	extraReducers: {
		[createQuiz.pending]: (state, action) => {
			if (state.loading === "idle") {
				state.loading = "pending";
				state.error = null;
			}
		},
		[createQuiz.fulfilled]: (state, { payload }) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.id = payload.id;
				state.name = payload.name;
				state.code = payload.code;
				state.numberOfPlayers = 1;
			}
		},
		[createQuiz.rejected]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = {
					message: "Failed to create the quiz",
				};
			}
		},
		[joinQuiz.pending]: (state, action) => {
			if (state.loading === "idle") {
				state.loading = "pending";
				state.error = null;
			}
		},
		[joinQuiz.fulfilled]: (state, { payload }) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.name = payload.name;
				state.code = payload.code;
			}
		},
		[joinQuiz.rejected]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = {
					message: "Failed to join the quiz",
				};
			}
		},
	},
});

export const {
	addPlayer,
	removePlayer,
	setCategoryId,
	setQuestion,
	nextQuestion,
	setConnectionStatus,
} = quiz.actions;
export default quiz.reducer;
