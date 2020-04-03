import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { isMobileSafari } from "react-device-detect";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap, TextField, Checkbox } from "~/components/elements";
import Layout from "~/components/layout";
import { H2 } from "~/components/typography";
import { StyledLink } from "~/components/link";
import Icon from "~/components/icon";
import bg from "~/assets/img/sign-up-bg.jpg";

const SignUp = () => {
	const { t } = useTranslation(["sign-up", "common"], { i18n });
	const [isSafari, setIsSafari] = useState("no");
	useEffect(() => {
		if (isMobileSafari) {
			setIsSafari("yes");
		}
	}, [isMobileSafari]);
	return (
		<Layout title="Sign Up" headerType="auth">
			<Wrapper
				ismobilesafari={isSafari}
				style={{ height: "calc(100rvh - 60px )" }}
			>
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
						<Form>
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
										<Icon name="spinner" size="14" />
									) : (
										<span>{t("common:sign-up")}</span>
									)}
								</StyledLink>
							</div>
						</Form>
					)}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

export const Wrapper = styled(Wrap)`
	padding: 0 30px;
	background-color: rgba(0, 0, 0, 0.8);
	background-image: url(${bg});
	background-repeat: no-repeat;
	background-position: bottom 1px right 0;
	background-blend-mode: overlay;
	background-size: cover;

	@media only screen and (min-device-width: 360px) and (max-device-height: 640px) and (-webkit-min-device-pixel-ratio: 2) {
		height: 560px !important;
	}

	${props =>
		props.ismobilesafari === "yes" &&
		css`
			@media only screen and (min-device-width: 375px) and (max-device-height: 668px) and (-webkit-min-device-pixel-ratio: 2) {
				height: 560px !important;
			}

			@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
				height: 575px !important;
			}

			@media only screen and (min-device-width: 414px) and (max-device-height: 896px) and (-webkit-min-device-pixel-ratio: 2) {
				height: 659px !important;
			}

			@media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-min-device-pixel-ratio: 3) {
				height: 575px !important;
			}
		`}

	span.error {
		display: block;
		font-size: 12px;
		text-indent: 5px;
		height: 20px;
		margin-bottom: 2px;
		color: ${props => props.theme.colors.error};
	}

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

SignUp.getInitialProps = async () => ({
	namespacesRequired: ["sign-up", "common"]
});

export default SignUp;
