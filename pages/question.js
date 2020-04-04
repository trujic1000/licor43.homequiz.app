import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Wrap100vh, Heading, TextField } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import { StyledLink } from "~/components/link";
import zebras from "~/assets/img/zebras.png";

const Question = () => {
	const router = useRouter();
	return (
		<Layout title="Guest Welcome" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					How would
					<span>you call</span>
					<span className="question-mark">?</span>
				</Heading>
				<QuestionWrap>
					<img src={zebras} alt="question" className="question-img" />
					<span className="question-text">A group of Zebras</span>
				</QuestionWrap>
				<Formik
					initialValues={{
						answer: "",
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
							router.push("/guest-rules");
						}, 1000);
					}}
				>
					{({ isSubmitting }) => (
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
									<span>Submit your Answer</span>
								)}
							</StyledLink>
						</StyledForm>
					)}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

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
		background-color: rgba(0, 0, 0, 0.5);
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
		color: #f3e03a;
	}
`;
