import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import ReactCodeInput from "react-code-input";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";
import Icon from "~/components/icon";
import { joinQuiz } from "~/slices/quiz";

const Join = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation(["guest-welcome", "common"], {
		i18n,
	});

	const [code, setCode] = useState(router.query.code);
	const loading = useSelector((state) => state.quiz.loading);
	const isSubmitting = loading === "pending";
	return (
		<Layout title="Guest Join" headerType="welcome">
			<Helmet>
				<meta name="description" content="You are invited to the quiz" />
				<meta property="og:type" content="website" />
				{/* <meta property="og:url" content="https://licor43.homequiz.app/" /> */}
				<meta
					property="og:url"
					content="https://mighty-depths-85418.herokuapp.com/"
				/>
				<meta
					property="og:title"
					content="Licor43 - The most creative quiz game ever"
				/>
				<meta property="og:description" content="You are invited to the quiz" />
				<meta
					property="og:image"
					content="https://mighty-depths-85418.herokuapp.com/img/icon-512x512.png"
				/>
				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://mighty-depths-85418.herokuapp.com/"
				/>
				<meta
					property="twitter:title"
					content="Licor43 - The most creative quiz game ever"
				/>
				<meta
					property="twitter:description"
					content="You are invited to the quiz"
				/>
				<meta
					property="twitter:image"
					content="https://mighty-depths-85418.herokuapp.com/img/icon-512x512.png"
				/>
			</Helmet>
			<Wrapper style={{ height: "calc(100rvh - 236px)" }}>
				<Heading>{t("common:welcome")}</Heading>
				<span className="text-big">{t("you-have-been-invited")}</span>
				<span className="text-medium">
					{t("please")}{" "}
					<span className="text-white">{t("insert-game-code")}</span>
				</span>
				<ReactCodeInput
					forceUppercase
					value={code}
					onChange={(code) => setCode(code)}
					autoFocus
				/>
				<StyledLink
					as="button"
					type="submit"
					disabled={isSubmitting}
					onClick={() => {
						const data = {
							name: "",
							code,
						};
						dispatch(joinQuiz({ data, router }));
					}}
				>
					{isSubmitting ? (
						<Icon name="spinner" size="14" />
					) : (
						<span>{t("common:join-the-game")}</span>
					)}
				</StyledLink>
			</Wrapper>
		</Layout>
	);
};

Join.getInitialProps = async () => ({
	namespacesRequired: ["guest-welcome", "common"],
});

export default Join;

const Wrapper = styled(Wrap100vh)`
	align-items: center;
	padding: 0 30px;
	margin-top: 100px;
	margin-bottom: 20px;
	font-weight: bold;

	span.text-big {
		display: block;
		width: 90%;
		margin: 0 auto;
		font-size: 20px;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1.3;
	}
	.text-medium {
		font-size: 20px;
		.text-white {
			color: ${(props) => props.theme.colors.white};
		}
	}
	button {
		margin: 0 auto;
	}
	input {
		background-color: transparent !important;
		border: 2px solid ${(props) => props.theme.colors.primary} !important;
		transition: 0.3s ease-in !important;
		color: ${(props) => props.theme.colors.primary} !important;
		padding-left: 0 !important;
		text-align: center !important;
		&:focus {
			outline: none !important;
			border: 2px solid ${(props) => props.theme.colors.white} !important;
		}
	}
`;
