import React from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Link from "~/components/link";

const Error = ({ statusCode }) => {
	const { t } = useTranslation("error", { i18n });
	return (
		<Layout title="Error" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				{statusCode === 404 ? (
					<Heading>
						<span>{t("error-404")}</span>
						<span className="text-medium">{t("page-does-not-exist")}</span>
					</Heading>
				) : (
					<Heading>
						<span>{t("error-500")}</span>
					</Heading>
				)}
				<Link href="/">{t("go-to-homepage")}</Link>
			</Wrapper>
		</Layout>
	);
};

//TODO: Add translations for lobby
Error.getInitialProps = async ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {
		statusCode,
		namespacesRequired: ["error"],
	};
};

export default Error;

const Wrapper = styled(Wrap100vh)`
	justify-content: initial;
	padding: 0 30px;
	text-align: center;
	div {
		margin: 20px 0;
	}
	.text-medium {
		font-size: 24px;
		margin: 60px 0;
	}
	a {
		margin: auto auto 20px auto;
	}
`;
