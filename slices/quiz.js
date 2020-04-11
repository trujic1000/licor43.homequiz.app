import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import quizAPI from "~/api/quizAPI";
import { connectSocket } from "~/utils";
import { setPlayer } from "./player";
import { setLanguage } from "./language";

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
	async ({ data, router }, { rejectWithValue, dispatch }) => {
		try {
			const response = await quizAPI.joinQuiz(data);
			dispatch(setLanguage(response.quiz_language));
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

export const answerQuestion = createAsyncThunk(
	"quiz/answerQuestion",
	async ({ data, router }, { rejectWithValue }) => {
		try {
			const response = await quizAPI.answerQuestion(data);
			if (response.left === 0) {
				router.push("/vote");
			} else {
				router.push("/lobby");
			}
			return {
				remainingVotes: response.left,
				lobbyText: "waiting-for-other-players-to-vote",
				answer: data.answer,
			};
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
		[answerQuestion.pending]: (state, action) => {
			if (state.loading === "idle") {
				state.loading = "pending";
				state.error = null;
			}
		},
		[answerQuestion.fulfilled]: (state, { payload }) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.remainingVotes = payload.remainingVotes;
				state.lobbyText = payload.lobbyText;
				state.answer = payload.answer;
			}
		},
		[answerQuestion.rejected]: (state, action) => {
			if (state.loading === "pending") {
				state.loading = "idle";
				state.error = {
					message: "Failed to answer the question",
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
