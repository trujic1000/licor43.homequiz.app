import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";
import { vote } from "~/slices/quiz";

const Vote = () => {
	const { t } = useTranslation("vote", { i18n });
	const dispatch = useDispatch();
	const router = useRouter();

	const { isAuthenticated } = useSelector((state) => state.auth);
	const { answers, question } = useSelector((state) => state.quiz);
	const [voteId, setVoteId] = useState(null);
	return (
		<Layout
			title="Guest Welcome"
			headerType={isAuthenticated ? "quiz" : "quiz-no-menu"}
		>
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("vote-for")}
					<span>{t("your-favorite")}</span>
					<span className="text-uppercase">{question.description}</span>
				</Heading>
				<VoteWrap>
					{answers.map(({ id, answer }) => (
						<div
							key={id}
							role="button"
							className="vote-item"
							onClick={() => setVoteId(id)}
						>
							<span className={`vote-text ${voteId === id ? "active" : ""}`}>
								{answer}
							</span>
						</div>
					))}
				</VoteWrap>
				<StyledLink
					as="button"
					type="submit"
					onClick={() =>
						dispatch(
							vote({
								data: {
									answer_id: voteId,
								},
								router,
							})
						)
					}
				>
					{t("vote")}
				</StyledLink>
			</Wrapper>
		</Layout>
	);
};

Vote.getInitialProps = async () => ({
	namespacesRequired: ["vote"],
});

export default Vote;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
	margin-bottom: 20px;

	span.text-uppercase {
		display: block;
		text-transform: uppercase;
		font-weight: normal;
		font-size: 22px;
		margin: 20px 0;
		color: ${(props) => props.theme.colors.primary};
	}
`;

const VoteWrap = styled.div`
	.vote-item {
		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 2px;
			background-color: ${(props) => props.theme.colors.primary};
		}
		&:last-child {
			&::after {
				display: none;
			}
		}
	}
	.vote-text {
		display: block;
		padding: 12px 15px;
		text-align: center;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		background-color: black;
		transition: all 300ms ease-in;
		&:hover,
		&.active {
			background-color: ${(props) => props.theme.colors.primary};
			color: ${(props) => props.theme.colors.secondary};
		}
	}
`;
