import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { BASE_URL } from "~/utils";

import {
	status,
	setConnectionStatus,
	addPlayer,
	removePlayer,
	setQuestion,
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
				router.push("/question");
			}
		});
};
