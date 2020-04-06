import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import Link from "~/components/link";

const ranking = [
	{
		id: 0,
		name: "William",
		points: 8,
	},
	{
		id: 1,
		name: "Jack",
		points: 10,
	},
	{
		id: 2,
		name: "Jake",
		points: 4,
	},
	{
		id: 3,
		name: "John",
		points: 1,
	},
	{
		id: 4,
		name: "Mark",
		points: 6,
	},
	{
		id: 5,
		name: "Charlie",
		points: 8,
	},
	{
		id: 6,
		name: "Jacob",
		points: 10,
	},
	{
		id: 7,
		name: "Alex",
		points: 7,
	},
];

const Ranking = () => {
	const { t } = useTranslation("ranking", { i18n });
	return (
		<Layout title="Round Winner" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					<span className="text-white" style={{ fontSize: 36 }}>
						Current Ranking
					</span>
				</Heading>
				<RankingWrap>
					{ranking
						.sort((a, b) => b.points - a.points)
						.map((user) => (
							<div className="ranking-item" key={user.id}>
								<span className="ranking-item__text">{user.name}</span>
								<div className="ranking-item__points">{user.points}</div>
							</div>
						))}
				</RankingWrap>
				<Link href="/lobby">Take the next question</Link>
			</Wrapper>
		</Layout>
	);
};

// TODO: Add translation for winner-round
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
