import React, { useEffect } from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
// import App from "next/app";
import reset from "styled-reset";
import { css, createGlobalStyle, ThemeProvider } from "styled-components";
import { appWithTranslation } from "../i18n";
import { loadUser } from "~/slices/auth";

import { initializeStore } from "../store";

const App = ({ Component, pageProps, store }) => {
	useEffect(() => {
		if (localStorage.token) {
			store.dispatch(loadUser());
		}
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Head>
					<title>Todo App</title>
				</Head>
				<GlobalStyle />
				<Component {...pageProps} />
			</Provider>
		</ThemeProvider>
	);
};

App.getInitialProps = async ({ Component, ctx }) => {
	return {
		pageProps: {
			// Call page-level getInitialProps
			...(Component.getInitialProps
				? await Component.getInitialProps(ctx)
				: {}),
		},
	};
};

export default withRedux(initializeStore)(appWithTranslation(App));

const theme = {
	colors: {
		primary: "#F3E03A",
		secondary: "#1C1C1C",
		white: "#FFF",
		error: "#ff424c",
	},
	mediaQueries: {
		small: "666px",
		medium: "736px",
		large: "812px",
	},
};
const fontFaces = css`
	@font-face {
		font-family: "Hurme Geometric";
		src: local("Hurme Geometric"),
			url("/fonts/hurmegeometricsans4_bold-webfont.woff") format("woff");
		font-weight: bold;
		font-style: normal;
	}
	@font-face {
		font-family: "Hurme Geometric";
		src: local("Hurme Geometric"),
			url("/fonts/hurmegeometricsans4_light-webfont.woff") format("woff");
		font-weight: 300;
		font-style: normal;
	}
	@font-face {
		font-family: "Hurme Geometric";
		src: local("Hurme Geometric"),
			url("/fonts/hurmegeometricsans4_semibold-webfont.woff") format("woff");
		font-weight: 500;
		font-style: normal;
	}
	@font-face {
		font-family: "Hurme Geometric";
		src: local("Hurme Geometric"),
			url("/fonts/hurmegeometricsans4-webfont.woff") format("woff");
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: "Roboto";
		src: local("Roboto"), url("/fonts/Roboto-Regular.woff") format("woff");
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: "Roboto";
		src: url("/fonts/Roboto-Bold.woff") format("woff");
		font-weight: bold;
		font-style: normal;
	}
`;

const GlobalStyle = createGlobalStyle`
	${reset};
	${fontFaces};

	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
 		box-sizing: inherit;
	}

	html, body {
		height: 100%;
		background-color: ${(props) => props.theme.colors.secondary};
		color: ${(props) => props.theme.colors.primary};
	}

	body {
		padding-top: 5px;
		line-height: 1.5;
		font-family: "Hurme Geometric", sans-serif;
	}

	a {
		text-decoration: none;
	}
`;
