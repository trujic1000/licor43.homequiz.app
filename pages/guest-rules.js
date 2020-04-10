import React from "react";
import { useTranslation, i18n } from "~/i18n";
import { Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Link from "~/components/link";
import { Wrapper } from "./rules";

const Rules = () => {
	const { t } = useTranslation(["guest-rules", "rules", "common"], { i18n });
	return (
		<Layout title="Rules" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("rules:a-quiz-game")}
					<span>{t("rules:simplified")}</span>
				</Heading>
				<ol>
					<li>{t("check-on-the-question")}</li>
					<li>{t("write-your-most-creative-answer")}</li>
					<li>{t("vote-for-your-favorite-answer")}</li>
				</ol>
				<span className="text-center">
					{t("rules:make-sure-to-become-winner")}
				</span>
				<Link href="/lobby" style={{ margin: "20px auto" }}>
					{t("common:start-the-game")}
				</Link>
			</Wrapper>
		</Layout>
	);
};

Rules.getInitialProps = async () => ({
	namespacesRequired: ["guest-rules", "rules", "common"],
});

export default Rules;
