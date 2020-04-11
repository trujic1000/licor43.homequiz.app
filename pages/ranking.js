import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Link from "~/components/link";
import { nextQuestion } from "~/slices/quiz";

const Ranking = () => {
	const { t } = useTranslation("ranking", { i18n });
	const dispatch = useDispatch();
	const { ranking, winner } = useSelector((state) => state.quiz);
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { role } = useSelector((state) => state.player);

	const rankingSorted = [...ranking].sort((a, b) => b.points - a.points);
	return (
		<Layout
			title="Round Winner"
			headerType={isAuthenticated ? "quiz" : "quiz-no-menu"}
		>
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					<span className="text-white" style={{ fontSize: 36 }}>
						{winner ? (
							<span>{t("final-ranking")}</span>
						) : (
							<span>{t("current-ranking")}</span>
						)}
					</span>
				</Heading>
				<RankingWrap>
					{rankingSorted.map((user) => (
						<div className="ranking-item" key={user.id}>
							<span className="ranking-item__text">{user.name}</span>
							<div className="ranking-item__points">{user.points}</div>
						</div>
					))}
				</RankingWrap>
				{winner ? (
					// TODO: What happens here?
					<Link href="#">{t("share-with-your-friends")}</Link>
				) : (
					<Link
						href={role === "HOST" ? "/category" : "/lobby"}
						onClick={() => dispatch(nextQuestion())}
					>
						{t("take-the-next-question")}
					</Link>
				)}
			</Wrapper>
		</Layout>
	);
};

Ranking.getInitialProps = async () => ({
	namespacesRequired: ["ranking"],
});

export default Ranking;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
	justify-content: initial;

	a {
		margin-top: auto;
		margin-bottom: 20px;
	}
`;

const RankingWrap = styled.div`
	overflow-y: scroll;
	height: 294px;
	margin-top: 20px;
	.ranking-item {
		display: flex;
		align-items: center;
		background-color: #000;
		color: ${(props) => props.theme.colors.primary};
		border-bottom: 2px dotted ${(props) => props.theme.colors.primary};
		&:last-child {
			border-bottom: none;
		}
	}
	.ranking-item__text {
		font-size: 22px;
		line-height: 1;
		padding-left: 8px;
	}
	.ranking-item__points {
		display: block;
		width: 60px;
		padding: 5px;
		margin: 8px 8px 8px auto;
		border-radius: 10px;
		background-color: ${(props) => props.theme.colors.primary};
		color: #000;
		font-size: 22px;
		text-align: center;
		font-weight: bold;
		line-height: 1;
	}
`;
