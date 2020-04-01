import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "~/components/layout";
import Button from "~/components/button";
import Icon from "~/components/icon";
import { withTranslation } from "~/i18n";
import wcOverlay from "~/assets/img/wc-overlay.png";
import wc1 from "~/assets/img/wc-1.png";
import wc2 from "~/assets/img/wc-2.png";
import wc3 from "~/assets/img/wc-3.png";
import wc4 from "~/assets/img/wc-4.png";

const WelcomeLayout = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(7, 1fr);
	grid-gap: 6px;
	height: 60vh;
	padding-top: 10px;
	&::before {
		content: "";
		z-index: 1;
		position: absolute;
		top: 9px;
		left: 0;
		height: 101%;
		width: 100%;
		background: url(${wcOverlay});
		background-position: center center;
		background-size: cover;
	}

	.item {
		position: relative;
		background-size: cover;
		background-position: center center;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.item--1 {
		grid-row: span 4;
		background-image: url(${wc1});
		span.welcome {
			color: ${props => props.theme.colors.primary};
			font-size: 38px;
			line-height: 1.2;
			text-align: center;
			font-weight: bold;
		}
	}
	.item--2 {
		grid-row: span 4;
		background-image: url(${wc2});
	}
	.item--3 {
		grid-row: span 3;
		background-image: url(${wc3});
		span {
			position: absolute;
			font-size: 12px;
			font-weight: normal;
			top: initial;
			bottom: -12px;
			width: 140%;
			left: 35%;
			color: ${props => props.theme.colors.primary};
			line-height: 1.2;
			z-index: 5;
			text-align: center;
		}
	}
	.item--4 {
		grid-row: span 3;
		background-image: url(${wc4});
	}
`;

const Text = styled.div`
	background: ${props => props.theme.colors.primary};
	color: #000;
	padding: 5px 40px 5px 5px;
	font-weight: bold;
	font-size: 2.5vh;
	line-height: 1.2;
	span.ever {
		font-size: 2.5vh;
		color: ${props => props.theme.colors.white};
		text-transform: capitalize;
	}
`;

const ButtonWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: absolute;
	bottom: 8%;
	z-index: 5;

	@media (min-height: ${props => props.theme.mediaQueries.medium}) {
		bottom: 10%;
	}

	@media (min-height: ${props => props.theme.mediaQueries.large}) {
		bottom: 13%;
	}
`;

const Auth = () => (
	<Layout title="Auth" headerType="welcome">
		<WelcomeLayout>
			<div className="item item--1">
				<span className="welcome">Welcome</span>
				<Text>
					The most creative game <span className="ever">ever</span>
				</Text>
			</div>
			<div className="item item--2" />
			<div className="item item--3" />
			<div className="item item--4" />
		</WelcomeLayout>
		<ButtonWrap>
			<Link href="/" passHref>
				<Button onClick={() => console.log("Sign Up")}>Sign Up</Button>
			</Link>
			<Link href="/" passHref>
				<Button type="facebook" onClick={() => console.log("Facebook")}>
					<Icon name="facebook" /> Continue with Facebook
				</Button>
			</Link>
			<Link href="/" passHref>
				<Button type="invert" onClick={() => console.log("Sign In")}>
					Sign In
				</Button>
			</Link>
		</ButtonWrap>
	</Layout>
);

Auth.getInitialProps = async () => ({
	namespacesRequired: ["common", "menu"]
});

export default withTranslation("menu")(Auth);
