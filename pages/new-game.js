import React from "react";
import styled from "styled-components";
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
	return (
		<Layout title="Terms and Conditions" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Formik
					initialValues={{
						quizName: "",
					}}
					validationSchema={Yup.object({
						quizName: Yup.string().required(t("quiz-name-is-required")),
					})}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 1000);
					}}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors, touched, isSubmitting }) => (
						<StyledForm>
							<Heading>
								{t("lets-set-up")}
								<span>{t("the-basics")}</span>
							</Heading>
							<div>
								<TextField
									name="quizName"
									className={errors.name ? "invalid" : null}
									placeholder={t("new-game-name") + "*"}
									autoComplete="new-password"
								/>
								<ErrorMessage>
									{errors.quizName && touched.quizName ? (
										<span>{"*" + errors.quizName}</span>
									) : null}
								</ErrorMessage>
							</div>
							<StyledLink
								as="button"
								type="submit"
								disabled={isSubmitting}
								style={{ margin: "20px auto" }}
							>
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
