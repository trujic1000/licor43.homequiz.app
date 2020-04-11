import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import Link from "~/components/link";
import { nextQuestion } from "~/slices/quiz";

const headings = [
	{
		top: "the-most",
		bottom: "creative-answer",
	},
	{
		top: "and-the",
		bottom: "winner-is",
	},
];

const WinnerRound = () => {
	const { t } = useTranslation("winner-round", { i18n });
	const dispatch = useDispatch();
	const { roundWinner, winner } = useSelector((state) => state.quiz);
	const { role, id } = useSelector((state) => state.player);

	const { isAuthenticated } = useSelector((state) => state.auth);
	const [heading, setHeading] = useState(headings[0]);
	const [text, setText] = useState(roundWinner.answer);
	const [isWhite, toggleWhite] = useState(false);

	const isWinner = roundWinner.socket_id === id;

	// Update text after 2.5 sec
	useEffect(() => {
		const t = setTimeout(() => {
			setHeading(headings[1]);
			setText(roundWinner.name);
			toggleWhite((prevState) => !prevState);
		}, 2500);
		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<Layout
			title="Round Winner"
			headerType={isAuthenticated ? "quiz" : "quiz-no-menu"}
		>
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				{!isWinner && (
					<Heading>
						{t(heading.top)}
						<span>{t(heading.bottom)}</span>
					</Heading>
				)}
				<RoundBlock style={isWinner ? { marginTop: 60 } : {}}>
					<Icon name="logo-alt" size="35" />
					{isWinner ? (
						<>
							<span className="text">{t("you-are")}</span>
							<span className="text text-white">{t("the-winner")}</span>
						</>
					) : (
						<span className={`text ${isWhite ? "text-white" : null}`}>
							{text}
						</span>
					)}
				</RoundBlock>
				{winner ? (
					<ButtonWrap>
						<Link
							href={role === "HOST" ? "/new-game" : "/guest-join"}
							onClick={() => dispatch(nextQuestion())}
						>
							{t("start-a-new-game")}
						</Link>
						<Link href="/ranking" variant="invert">
							{t("check-on-ranking")}
						</Link>
					</ButtonWrap>
				) : (
					<ButtonWrap>
						<Link
							href={role === "HOST" ? "/category" : "/lobby"}
							onClick={() => dispatch(nextQuestion())}
						>
							{t("take-the-next-question")}
						</Link>
						<Link href="/ranking" variant="invert">
							{t("check-on-ranking")}
						</Link>
					</ButtonWrap>
				)}
			</Wrapper>
		</Layout>
	);
};

WinnerRound.getInitialProps = async () => ({
	namespacesRequired: ["winner-round"],
});

export default WinnerRound;

export const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
`;

export const RoundBlock = styled.div`
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

export const ButtonWrap = styled.div`
	display: grid;
	margin-bottom: 10px;
	button {
		margin: 10px auto;
	}
`;
