import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { BASE_URL } from "~/utils";

import {
	status,
	setConnectionStatus,
	addPlayer,
	setCategoryId,
	removePlayer,
	setQuestion,
	setAnswers,
	roundEnded,
} from "~/slices/quiz";
import { setId } from "~/slices/player";

export const connectSocket = ({ code, name, role, router, dispatch }) => {
	const options = {
		broadcaster: "pusher",
		key: "20651a2ee92591f96fd2",
		cluster: "eu",
		forceTLS: true,
		//authEndpoint is your apiUrl + /broadcast/auth
		authEndpoint: `${BASE_URL}/api/broadcast/auth/guest`,
		auth: {
			headers: {
				Authorization: `name:${name}`,
				Accept: "application/json",
			},
		},
	};

	const echo = new Echo(options);

	echo
		.join(`quiz.${code}`)
		.here((users) => {
			dispatch(setConnectionStatus(status.CONNECTED));
			const user = users.filter((data) => data.name === name)[0];
			// Change playerId
			dispatch(setId(user.id));
		})
		.joining((user) => {
			// Only HOST can see all players that are joining
			console.log("JOINING: " + JSON.stringify(user, undefined, 2));
			// Add player to the array
			dispatch(addPlayer(user));
			// Push notification for host
			if (role === "HOST") {
				toast(`${user.name} connected`, {
					type: toast.TYPE.WARNING,
				});
			}
		})
		.leaving((user) => {
			console.log("LEAVING: " + JSON.stringify(user, undefined, 2));
			dispatch(removePlayer(user.id));
			toast(`${user.name} disconnected`, {
				type: toast.TYPE.WARNING,
			});
		})
		.listen("QuestionsEvent", (data) => {
			console.log("QuestionsEvent: " + JSON.stringify(data, undefined, 2));
			if (Object.keys(data.question).length > 0) {
				dispatch(setQuestion(data.question));
				dispatch(setCategoryId(data.question.category));
				router.push("/question");
			}
		})
		.listen("VotingEvent", (data) => {
			console.log("VotingEvent: " + JSON.stringify(data, undefined, 2));
			dispatch(setAnswers(data.answers));
			router.push("/vote");
		})
		.listen("PlayersPointsEvent", (data) => {
			console.log("PlayerPointsEvent: " + JSON.stringify(data, undefined, 2));
			const ranking = data.players.map((player) => ({
				id: player.id,
				name: player.name,
				points: player.points,
			}));
			const roundWinner = data.winner;
			roundWinner.answer = data.winner_answer;
			const remainingRounds = data.rounds_left;
			const payload = {
				ranking,
				roundWinner,
				remainingRounds,
			};
			dispatch(roundEnded(payload));
			router.push("/winner-round");
		})
		.listen("QuizEndedEvent", (data) => {
			console.log("QuizEndedEvent: " + JSON.stringify(data, undefined, 2));
			// if (quiz.username === data.winner.name) {
			//   console.log(
			//     'redirecting to winner quiz',
			//     quiz.username === data.winner.name
			//   );
			//   router.push('/quiz/winner-quiz');
			// } else {
			//   router.push('/quiz/ranking');
			// }
		});
};
