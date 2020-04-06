import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import Link from "~/components/link";

const headings = [
	{
		top: "The most",
		bottom: "creative answer",
	},
	{
		top: "And the",
		bottom: "winner is",
	},
];

const winner = {
	answer: "A Maze",
	name: "William",
};

const WinnerRound = () => {
	const { t } = useTranslation("winner-round", { i18n });
	const [heading, setHeading] = useState(headings[0]);
	const [text, setText] = useState(winner.answer);
	const [isWhite, toggleWhite] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setHeading(headings[1]);
			setText(winner.name);
			toggleWhite((prevState) => !prevState);
		}, 2000);
	}, []);
	return (
		<Layout title="Round Winner" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{heading.top}
					<span>{heading.bottom}</span>
				</Heading>
				<RoundBlock>
					<Icon name="logo-alt" size="35" />
					<span className={`text ${isWhite ? "text-white" : null}`}>
						{text}
					</span>
				</RoundBlock>
				<ButtonWrap>
					<Link href="/lobby">Take the next question</Link>
					<Link href="/ranking" variant="invert">
						Check on Ranking
					</Link>
				</ButtonWrap>
			</Wrapper>
		</Layout>
	);
};

// TODO: Add translation for winner-round
WinnerRound.getInitialProps = async () => ({
	namespacesRequired: ["winner-round"],
});

export default WinnerRound;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
`;

const RoundBlock = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 230px;
	height: 230px;
	margin: 0 auto 15px;
	border-radius: 50%;
	border: 10px solid ${(props) => props.theme.colors.primary};

	svg {
		position: absolute;
		top: 5px;
		right: 20px;
		width: 35px;
		background-color: ${(props) => props.theme.colors.secondary};
		border-radius: 50%;
	}

	.text {
		font-size: 4.5vh;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1;
		text-align: center;
		&.text-white {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const ButtonWrap = styled.div`
	display: grid;
	margin-bottom: 10px;
	button {
		margin: 10px auto;
	}
`;
