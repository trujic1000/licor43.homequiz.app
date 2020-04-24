import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	render() {
		return (
			<html lang="en-GB">
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					{/* Android */}
					<meta name="theme-color" content="#1c1c1c" />
					<meta name="mobile-web-app-capable" content="yes" />
					{/* iOS */}
					<meta name="apple-mobile-web-app-title" content="Licor 43" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					{/* Windows */}
					<meta name="msapplication-navbutton-color" content="red" />
					<meta name="msapplication-TileColor" content="red" />
					<meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
					<meta name="msapplication-config" content="browserconfig.xml" />
					{/* Pinned Sites */}
					<meta name="application-name" content="Licor 43" />
					<meta name="msapplication-tooltip" content="Licor 43" />
					<meta name="msapplication-starturl" content="/" />
					{/* Tap highlighting */}
					<meta name="msapplication-tap-highlight" content="no" />
					{/* UC Mobile Browser */}
					<meta name="full-screen" content="yes" />
					<meta name="browsermode" content="application" />
					{/* Disable night mode for this page */}
					<meta name="nightmode" content="enable/disable" />
					{/* Fitscreen */}
					<meta name="viewport" content="uc-fitscreen=yes" />
					{/* Layout mode */}
					<meta name="layoutmode" content="fitscreen/standard" />
					<meta name="imagemode" content="force" />

					<meta name="full-screen" content="yes" />
					<meta name="browsermode" content="application" />

					<link href="/img/icon-192x192.png" rel="apple-touch-icon" />
					<link href="/img/icon-192x192.png" rel="apple-touch-startup-image" />
					<link href="/img/icon-192x192.png" rel="icon" sizes="192x192" />

					<meta name="title" content="Licor43" />
					<meta name="description" content="The most creative quiz game ever" />

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://licor43.homequiz.app/" />
					<meta
						property="og:title"
						content="Licor43 - The most creative quiz game ever"
					/>
					<meta
						property="og:description"
						content="The most creative quiz game ever"
					/>
					<meta
						property="og:image"
						content="https://licor43.homequiz.app/img/icon-192x192.png"
					/>

					<meta property="twitter:card" content="summary_large_image" />
					<meta
						property="twitter:url"
						content="https://licor43.homequiz.app/"
					/>
					<meta
						property="twitter:title"
						content="Licor43 - The most creative quiz game ever"
					/>
					<meta
						property="twitter:description"
						content="The most creative quiz game ever"
					/>
					<meta
						property="twitter:image"
						content="https://licor43.homequiz.app/img/icon-192x192.png"
					/>
					<meta name="screen-orientation" content="portrait" />

					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="/img/favicon.ico" />
					<noscript>You need to enable JavaScript to run this app.</noscript>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheet();
	// Render app and page and get the context of the page with collected side effects.
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collectStyles(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);
	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};
export default MyDocument;
