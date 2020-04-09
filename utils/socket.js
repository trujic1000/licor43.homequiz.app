import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { BASE_URL } from "~/utils";

import { status, setConnectionStatus, addPlayer } from "~/slices/quiz";
import { setId } from "~/slices/player";

export const connectSocket = ({ code, name, router, dispatch }) => {
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

	echo.join(`quiz.${code}`).here((users) => {
		dispatch(setConnectionStatus(status.CONNECTED));
		const user = users.filter((data) => data.name === name)[0];
		// Change playerId
		dispatch(setId(user.id));
		// Add player to the array
		dispatch(addPlayer(user));
	});
};
