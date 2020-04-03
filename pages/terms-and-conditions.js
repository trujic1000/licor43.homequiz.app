import React from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh } from "~/components/elements";
import Layout from "~/components/layout";
import Link from "~/components/link";

const TermsAndConditions = () => {
	const { t } = useTranslation("tac", { i18n });
	return (
		<Layout title="Terms and Conditions" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<h1>{t("title")}</h1>
				<ul>
					{t("content")
						.split("\n")
						.map((item, i) => (
							<li key={i}>
								{item}
								<br />
							</li>
						))}
				</ul>
				<Link href="/auth/sign-up" style={{ marginBottom: 20 }}>
					{t("go-back")}
				</Link>
			</Wrapper>
		</Layout>
	);
};

TermsAndConditions.getInitialProps = async () => ({
	namespacesRequired: ["tac"],
});

export default TermsAndConditions;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
	overflow: hidden;
	h1 {
		padding: 17px 0;
		margin-bottom: 20px;
		color: ${(props) => props.theme.colors.white};
		line-height: 1;
		font-size: 30px;
		font-weight: bold;
		text-align: center;
	}
	ul {
		flex: 1;
		font-size: 16px;
		overflow-y: scroll;
		margin-bottom: 30px;
		color: ${(props) => props.theme.colors.primary};
		li {
			text-align: justify;
			font-weight: 500;
		}
	}
`;
