import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Menu from "~/components/header/Menu";
import { Header, HeaderQuiz, HeaderHome } from "../header";
import { initGA, logPageView } from "~/utils/analytics";
import { useEffect } from "react";

// TODO: Add Google Analytics
const Layout = ({ title, headerType, children }) => {
	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}, []);

	return (
		<>
			<Head>
				<title>{title} | Licor43</title>
			</Head>
			<>
				{headerType === "home" && <HeaderHome />}
				{headerType === "welcome" && <Header size="big" />}
				{headerType === "auth" && <Header />}
				{headerType === "quiz-no-menu" && (
					<>
						<ToastContainer hideProgressBar style={{ color: "#000" }} />
						<HeaderQuiz />
					</>
				)}
				{headerType === "quiz" && (
					<>
						<ToastContainer hideProgressBar style={{ color: "#000" }} />
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
