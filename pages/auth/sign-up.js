import React from "react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Div100vh from "react-div-100vh";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import Layout from "~/components/layout";
import { H2 } from "~/components/typography";
import { StyledLink } from "~/components/link";
import Checkbox from "~/components/checkbox";
import Icon from "~/components/icon";
import bg from "~/assets/img/sign-up-bg.jpg";

const SignUp = () => {
	const { t } = useTranslation(["sign-up", "common"], { i18n });
	return (
		<Layout title="Sign Up" headerType="auth">
			<Wrapper style={{ height: "calc(100rvh - 60px)" }}>
				<H2>
					{t("common:welcome")} <span>{t("common:sign-up")}</span>
				</H2>
				<Formik
					initialValues={{
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
						terms: false,
						newsletter: false
					}}
					validationSchema={Yup.object({
						name: Yup.string().required("Name is Required"),
						email: Yup.string()
							.email("Invalid email address")
							.required("Email is Required"),
						password: Yup.string()
							.min(6, "Password must be at least 6 characters")
							.required("Password is Required"),
						confirmPassword: Yup.string().oneOf(
							[Yup.ref("password"), null],
							"Passwords must match"
						),
						terms: Yup.boolean().oneOf(
							[true],
							"You Must Accept Terms & Conditions"
						)
					})}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 5000);
					}}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors, touched, isSubmitting }) => (
						<StyledForm>
							<TextField
								name="name"
								className={errors.name ? "invalid" : null}
								placeholder={t("your-name") + "*"}
								autoComplete="new-password"
							/>
							<span className="error">
								{errors.name && touched.name ? (
									<span>{"*" + errors.name}</span>
								) : null}
							</span>
							<TextField
								name="email"
								className={errors.email ? "invalid" : null}
								placeholder={t("your-email") + "*"}
								autoComplete="new-password"
							/>
							<span className="error">
								{errors.email && touched.email ? (
									<span>{"*" + errors.email}</span>
								) : null}
							</span>
							<TextField
								name="password"
								className={errors.password ? "invalid" : null}
								type="password"
								placeholder={t("set-password") + "*"}
								autoComplete="new-password"
							/>
							<span className="error">
								{errors.password && touched.password ? (
									<span>{"*" + errors.password}</span>
								) : null}
							</span>
							<TextField
								name="confirmPassword"
								className={errors.confirmPassword ? "invalid" : null}
								type="password"
								placeholder={t("confirm-password") + "*"}
								autoComplete="new-password"
							/>
							<span className="error">
								{errors.confirmPassword && touched.confirmPassword ? (
									<span>{"*" + errors.confirmPassword}</span>
								) : null}
							</span>
							<Checkbox name="terms">
								{t("terms")}{" "}
								<Link href="/terms-and-conditions">
									<a className="color-white">{t("tac")}</a>
								</Link>
							</Checkbox>
							<Checkbox name="newsletter" style={{ top: -3 }}>
								{t("newsletter")} <strong>Licor 43</strong>
							</Checkbox>
							<div className="btn-wrap">
								<StyledLink as="button" type="submit" disabled={isSubmitting}>
									{isSubmitting ? (
										<Icon name="spinner" size={14} />
									) : (
										<span>{t("common:sign-up")}</span>
									)}
								</StyledLink>
							</div>
						</StyledForm>
					)}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

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

const StyledForm = styled(Form)`
	@media screen and (min-height: ${props => props.theme.mediaQueries.medium}) {
		margin-bottom: 30px;
	}
	@media screen and (min-height: ${props => props.theme.mediaQueries.large}) {
		margin-bottom: 60px;
	}

	span.error {
		display: block;
		font-size: 12px;
		text-indent: 5px;
		height: 20px;
		margin-bottom: 2px;
		border-radius: 8px;
		color: ${props => props.theme.colors.error};
	}
`;

const TextField = styled(Field).attrs(props => ({
	type: props.type || "text"
}))`
	display: block;
	width: 100%;
	min-height: 45px;
	padding: 8px 15px;
	background-color: transparent;
	border: 2px solid ${props => props.theme.colors.primary};
	border-radius: 8px;
	text-align: center;
	font-size: 18px;
	transition: all 300ms ease;
	color: ${props => props.theme.colors.white};
	&.invalid {
		border-color: ${props => props.theme.colors.error};
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

SignUp.getInitialProps = async () => ({
	namespacesRequired: ["sign-up", "common"]
});

export default SignUp;
