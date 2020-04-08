import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useTranslation, i18n } from "~/i18n";
import Layout from "~/components/layout";
import Link, { StyledLink } from "~/components/link";
import Icon from "~/components/icon";
import { facebookLogin } from "~/slices/auth";
import wcOverlay from "~/assets/img/wc-overlay.png";
import wc1 from "~/assets/img/wc-1.png";
import wc2 from "~/assets/img/wc-2.png";
import wc3 from "~/assets/img/wc-3.png";
import wc4 from "~/assets/img/wc-4.png";

const Auth = () => {
	const { t } = useTranslation(["auth", "common"], { i18n });
	const router = useRouter();
	const dispatch = useDispatch();
	const language = useSelector((state) => state.language.current);

	const responseFacebook = (response) => {
		response.language = language;
		facebookLogin({ data: response, router });
	};
	return (
		<Layout title="Auth" headerType="welcome">
			<WelcomeLayout>
				<div className="item item--1">
					<span className="welcome">{t("common:welcome")}</span>
					<Text>
						{t("the-most-creative-game")}
						<span className="ever"> {t("ever")}</span>
					</Text>
				</div>
				<div className="item item--2" />
				<div className="item item--3" />
				<div className="item item--4" />
			</WelcomeLayout>
			<ButtonWrap>
				<Link href="/auth/sign-up" onClick={() => console.log("Sign Up")}>
					{t("common:sign-up")}
				</Link>
				<FacebookLogin
					appId="2809198462450733"
					disableMobileRedirect={true}
					fields="name, email"
					callback={responseFacebook}
					render={(renderProps) => (
						<StyledLink
							as="button"
							variant="facebook"
							onClick={renderProps.onClick}
						>
							<Icon name="facebook" /> {t("continue-with-facebook")}
						</StyledLink>
					)}
				/>
				<Link
					href="/auth/sign-in"
					variant="invert"
					onClick={() => console.log("Sign In")}
				>
					{t("common:sign-in")}
				</Link>
			</ButtonWrap>
		</Layout>
	);
};

Auth.getInitialProps = async () => ({
	namespacesRequired: ["auth", "common"],
});

export default Auth;

const WelcomeLayout = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(7, 1fr);
	grid-gap: 6px;
	height: 385px;
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
			color: ${(props) => props.theme.colors.primary};
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
			color: ${(props) => props.theme.colors.primary};
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
	background: ${(props) => props.theme.colors.primary};
	color: #000;
	padding: 5px 40px 5px 5px;
	font-weight: bold;
	font-size: 2.5vh;
	line-height: 1.2;
	span.ever {
		font-size: 2.5vh;
		color: ${(props) => props.theme.colors.white};
		text-transform: capitalize;
	}
`;

const ButtonWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: -60px;
	z-index: 5;

	a,
	button {
		z-index: 5;
	}

	button {
		margin: 0 0 10px 0;
	}
`;
