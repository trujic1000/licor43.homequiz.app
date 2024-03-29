import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";

const Lobby = () => {
	const { t } = useTranslation("lobby", { i18n });
	const { lobbyText } = useSelector((state) => state.quiz);
	return (
		<Layout title="Lobby" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>{t("lobby")}</Heading>
				<span>{t(lobbyText)}</span>
			</Wrapper>
		</Layout>
	);
};

Lobby.getInitialProps = async () => ({
	namespacesRequired: ["lobby"],
});

export default Lobby;

const Wrapper = styled(Wrap100vh)`
	justify-content: initial;
	padding: 0 30px;
	text-align: center;
	div {
		margin: 20px 0;
	}
	span {
		margin: 80px auto;
		display: block;
		font-weight: bold;
		font-size: 24px;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1.3;
	}
`;
