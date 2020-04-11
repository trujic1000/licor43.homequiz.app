import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { useTranslation, i18n } from "~/i18n";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Wrap100vh, Heading, TextField } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import { StyledLink } from "~/components/link";
import { answerQuestion } from "~/slices/quiz";
import { STORAGE_URL } from "~/utils";

const Question = () => {
	const { t } = useTranslation(["question", "common"], { i18n });
	const router = useRouter();
	const dispatch = useDispatch();

	const { categoryId, question, loading } = useSelector((state) => state.quiz);
	const player = useSelector((state) => state.player);
	const [playing, setPlaying] = useState(false);
	const isSubmitting = loading === "pending";
	return (
		<Layout title="Guest Welcome" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{categoryId === 1 && t("how-would")}
					{categoryId === 2 && t("what-can")}
					{categoryId === 3 && t("what-is")}
					{categoryId === 4 && t("what-is-it")}
					<span>
						{categoryId === 1 && t("you-call")}
						{categoryId === 2 && t("you-see")}
						{categoryId === 3 && t("this-sound")}
						{categoryId === 4 && t("made-of")}
					</span>
					<span className="question-mark">?</span>
				</Heading>
				{categoryId !== 3 ? (
					<QuestionWrap id={categoryId}>
						<img
							src={`${STORAGE_URL}/questions/${question.image}`}
							alt="question"
							className="question-img"
						/>
						<span className="question-text">{question.description}</span>
					</QuestionWrap>
				) : (
					<AudioQuestionWrap>
						{!playing && <Icon name="play" onClick={() => setPlaying(true)} />}
						{playing && <Icon name="pause" onClick={() => setPlaying(false)} />}
						{playing && (
							<ReactPlayer
								url={`${STORAGE_URL}/${question.audio}`}
								playing
								config={{
									file: {
										forceAudio: true,
									},
								}}
								width={0}
								heigh={0}
								onEnded={() => setPlaying(false)}
							/>
						)}
					</AudioQuestionWrap>
				)}
				<Formik
					initialValues={{
						answer: "",
					}}
					onSubmit={(values) => {
						dispatch(
							answerQuestion({
								data: {
									socket_id: player.id,
									question_id: question.id,
									answer: values.answer,
								},
								router,
							})
						);
					}}
				>
					<StyledForm>
						<TextField
							name="answer"
							placeholder={"Your Answer"}
							autoComplete="new-password"
						/>
						<StyledLink as="button" type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<Icon name="spinner" size="14" />
							) : (
								<span>{t("common:submit-your-answer")}</span>
							)}
						</StyledLink>
					</StyledForm>
				</Formik>
			</Wrapper>
		</Layout>
	);
};

Question.getInitialProps = async () => ({
	namespacesRequired: ["question", "common"],
});

export default Question;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
	margin-bottom: 20px;
	font-weight: bold;
	span.question-mark {
		font-family: "Roboto";
		font-size: 90px;
		font-weight: 500;
		color: ${(props) => props.theme.colors.primary};
		position: absolute;
		top: 17px;
		right: 60px;
		transform: rotate(25deg);
	}
	span.text-big {
		display: block;
		width: 90%;
		margin: 0 auto 20px auto;
		font-size: 24px;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1.3;
	}
	.text-medium {
		font-size: 20px;
		margin-bottom: 20px;
		.text-white {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const StyledForm = styled(Form)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const QuestionWrap = styled.div`
	position: relative;
	overflow: hidden;
	margin: 15px 0 30px;
	border-radius: 25px;
	border: 2px solid ${(props) => props.theme.colors.primary};
	height: 200px;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${(props) => props.id === 1 && `rgba(0, 0, 0, 0.8)`};
	}
	.question-img {
		width: 100%;
		height: 100%;
	}
	.question-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		line-height: 1;
		text-align: center;
		font-size: 30px;
		color: ${(props) => props.theme.colors.primary};
	}
`;

const AudioQuestionWrap = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	margin: 30px auto;
	border-radius: 50%;
	background-color: ${(props) => props.theme.colors.primary};

	#play {
		margin-left: 20px;
	}
`;
