import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Menu from "~/components/header/Menu";

import { Header, HeaderQuiz, HeaderHome } from "../header";

// TODO: Add Google Analytics
const Layout = ({ title, headerType, children }) => {
	return (
		<>
			<Head>
				<title>{title} | Licor43</title>
			</Head>
			<>
				{headerType === "home" && <HeaderHome />}
				{headerType === "welcome" && <Header size="big" />}
				{headerType === "auth" && <Header />}
				{headerType === "quiz-no-menu" && <HeaderQuiz />}
				{headerType === "quiz" && (
					<>
						<Menu />
						<HeaderQuiz />
					</>
				)}
				{children}
			</>
		</>
	);
};

Layout.propTypes = {
	title: PropTypes.string.isRequired,
	headerType: PropTypes.string,
};

Layout.defaultProps = {
	headerType: "quiz",
};

export default Layout;