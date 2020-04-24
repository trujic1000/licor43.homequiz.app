import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, clearErrors } from "~/slices/quiz";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation, i18n } from "~/i18n";
import {
	Wrap100vh,
	Heading,
	TextField,
	ErrorMessage,
} from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import { StyledLink } from "~/components/link";

const NewGame = () => {
	const { t } = useTranslation("new-game", { i18n });
	const router = useRouter();
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.quiz);

	const isSubmitting = loading === "pending";
	return (
		<Layout title="New Game" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Formik
					initialValues={{
						quizName: "",
					}}
					validationSchema={Yup.object({
						quizName: Yup.string().required(t("quiz-name-is-required")),
					})}
					onSubmit={(values) => {
						const data = {
							quiz_name: values.quizName,
							// TODO: Fix the layout
							quiz_rounds: 5,
						};
						clearErrors();
						dispatch(createQuiz({ data, router }));
					}}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors }) => (
						<StyledForm>
							<Heading>
								{t("lets-set-up")}
								<span>{t("the-basics")}</span>
							</Heading>
							<div>
								<TextField
									name="quizName"
									className={errors.name || error ? "invalid" : null}
									placeholder={t("new-game-name") + "*"}
									autoComplete="new-password"
								/>
								<ErrorMessage>
									{errors.quizName && <span>{"*" + errors.quizName}</span>}
									{error && <span>{error.message}</span>}
								</ErrorMessage>
							</div>
							<StyledLink as="button" type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<Icon name="spinner" size="14" />
								) : (
									<span>{t("create-new-game")}</span>
								)}
							</StyledLink>
						</StyledForm>
					)}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

NewGame.getInitialProps = async () => ({
	namespacesRequired: ["new-game"],
});

export default NewGame;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
`;

const StyledForm = styled(Form)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
