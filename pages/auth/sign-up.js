import React from "react";
import Link from "next/link";
import { StyledLink } from "~/components/link";
import Div100vh from "react-div-100vh";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import Layout from "~/components/layout";
import { H2 } from "~/components/typography";
import bg from "~/assets/img/sign-up-bg.jpg";

const Wrapper = styled(Div100vh)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 30px;
	background-color: rgba(0, 0, 0, 0.8);
	background-image: url(${bg});
	background-blend-mode: overlay;
	background-position: bottom 1px right 0;
	background-size: cover;

	.btn-wrap {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-bottom: 30px;
		button {
			margin-top: 10px;
		}
	}
`;

const Form = styled.form`
	@media screen and (min-height: ${props => props.theme.mediaQueries.medium}) {
		margin-bottom: 30px;
	}
	@media screen and (min-height: ${props => props.theme.mediaQueries.large}) {
		margin-bottom: 60px;
	}
`;

const TextField = styled.input.attrs(props => ({
	type: props.type || "text"
}))`
	display: block;
	width: 100%;
	min-height: 45px;
	margin-bottom: 15px;
	padding: 8px 15px;
	background-color: transparent;
	border: 2px solid ${props => props.theme.colors.primary};
	border-radius: 8px;
	text-align: center;
	font-size: 18px;
	transition: all 300ms ease;
	color: ${props => props.theme.colors.white};
	&:last-of-type {
		margin-bottom: 20px;
	}
	&:focus {
		outline: none;
		border: 2px solid ${props => props.theme.colors.white};
		&::placeholder {
			color: ${props => props.theme.colors.white};
		}
	}
	&::placeholder {
		color: #777777;
		transition: all 300ms ease-in;
	}
	${props =>
		props.type === "password" &&
		css`
			letter-spacing: 5px;
			&::placeholder {
				letter-spacing: 0;
				color: #777777;
			}
		`}
`;

const CheckboxWrap = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 15px;
	color: ${props => props.theme.colors.primary};
	cursor: pointer;
	font-size: 14px;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	&:last-of-type {
		font-size: 11px;
	}
	input[type="checkbox"] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	span.checkbox {
		position: absolute;
		top: 3px;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: transparent;
		border: 1px solid ${props => props.theme.colors.primary};
		border-radius: 4px;
	}
	a {
		color: ${props => props.theme.colors.white};
		text-decoration: underline;
	}
`;

const SignUp = () => {
	const { t } = useTranslation(["sign-up", "common"], { i18n });

	const onSubmit = e => {
		e.preventDefault();
		console.log("Sign Up");
	};
	return (
		<Layout title="Sign Up" headerType="auth">
			<Wrapper style={{ height: "calc(100rvh - 60px)" }}>
				<H2>
					{t("common:welcome")} <span>{t("common:sign-up")}</span>
				</H2>
				<Form onSubmit={onSubmit}>
					<TextField placeholder={t("your-name")} autoComplete="new-password" />
					<TextField
						placeholder={t("your-email")}
						autoComplete="new-password"
					/>
					<TextField
						type="password"
						placeholder={t("set-password")}
						autoComplete="new-password"
					/>
					<TextField
						type="password"
						placeholder={t("confirm-password")}
						autoComplete="new-password"
					/>
					<CheckboxWrap>
						<input type="checkbox" />
						<span className="checkbox" />
						{t("consent")}{" "}
						<Link href="/terms-and-conditions">
							<a className="color-white">{t("tac")}</a>
						</Link>
					</CheckboxWrap>
					<CheckboxWrap>
						<input type="checkbox" />
						<span className="checkbox" style={{ top: -3 }} />
						{t("newsletter")} <b>Licor 43</b>
					</CheckboxWrap>
					<div className="btn-wrap">
						<StyledLink as="button">{t("common:sign-up")}</StyledLink>
					</div>
				</Form>
			</Wrapper>
		</Layout>
	);
};

SignUp.getInitialProps = async () => ({
	namespacesRequired: ["sign-up", "common"]
});

export default SignUp;
