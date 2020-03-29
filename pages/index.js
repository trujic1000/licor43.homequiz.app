import React from "react";
import { HeaderQuiz } from "~/components/header";
import { withTranslation } from "../i18n";

const Index = () => (
	<div>
		<HeaderQuiz />
	</div>
);

Index.getInitialProps = async () => ({
	namespacesRequired: ["common", "menu"]
});

export default withTranslation("menu")(Index);
