import { request, BASE_URL } from "~/utils";

// Register User
const register = data => {
	return request({
		url: `urL${BASE_URL}/api/auth/register`,
		method: "POST",
		data
	});
};

// Login with email and password
const login = data => {
	return request({
		url: `${BASE_URL}/api/auth/login`,
		method: "POST",
		data
	});
};

// Facebook login
const facebookLogin = data => {
	return request({
		url: `${BASE_URL}/api/auth/login/facebook`,
		method: "POST",
		data
	});
};

// Get currently logged in user
const loadUser = () => {
	return request({
		url: `${BASE_URL}/api/auth/user`,
		method: "GET"
	});
};

export default {
	register,
	login,
	facebookLogin,
	loadUser
};
