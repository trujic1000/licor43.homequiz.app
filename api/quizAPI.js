import { request, BASE_URL } from "~/utils";

// Create Quiz
// data = { name }
const createQuiz = (data) => {
	return request({
		url: `${BASE_URL}/api/quiz/generate`,
		method: "POST",
		body: data,
	});
};

// Join Quiz
// data = { name, code }
const joinQuiz = (data) => {
	return request({
		url: `${BASE_URL}/api/quiz/join`,
		method: "POST",
		body: data,
	});
};

// Get Question
// data = { quiz_id, category }
const getQuestion = (data) => {
	return request({
		url: `${BASE_URL}/api/quiz/question`,
		method: "POST",
		body: data,
	});
};

// Answer Question
// data = { socket_id, question_id, answer }
const answerQuestion = (data) => {
	return request({
		url: `${BASE_URL}/api/quiz/answer`,
		method: "POST",
		body: data,
	});
};

// Vote
// data = { answer_id}
const vote = (data) => {
	return request({
		url: `${BASE_URL}/api/quiz/vote`,
		method: "POST",
		body: data,
	});
};

export default {
	createQuiz,
	joinQuiz,
	getQuestion,
	answerQuestion,
	vote,
};
