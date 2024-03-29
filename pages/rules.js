import React from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Link from "~/components/link";

const Rules = () => {
	const { t } = useTranslation("rules", { i18n });
	return (
		<Layout title="Rules" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("a-quiz-game")}
					<span>{t("simplified")}</span>
				</Heading>
				<ol>
					<li>{t("create-a-new-game")}</li>
					<li>{t("share-the-code-with-participants")}</li>
					<li>{t("choose-a-category")}</li>
					<li>{t("write-your-most-creative-answer")}</li>
					<li>{t("vote-for-your-favorite-answer")}</li>
					<li className="text-white">{t("dont-close-your-browser")}</li>
				</ol>
				<span className="text-center">{t("make-sure-to-become-winner")}</span>
				<Link href="/new-game" style={{ margin: "20px auto" }}>
					{t("start-new-game")}
				</Link>
			</Wrapper>
		</Layout>
	);
};

Rules.getInitialProps = async () => ({
	namespacesRequired: ["rules"],
});

export default Rules;

export const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
	ol {
		list-style-type: decimal;
		li {
			margin: 0 0 10px 15px;
			&.text-white {
				color: ${(props) => props.theme.colors.white};
				font-weight: bold;
			}
		}
	}
	span.text-center {
		text-align: center;
		color: ${(props) => props.theme.colors.white};
		font-weight: bold;
	}
`;
