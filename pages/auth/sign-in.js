import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { isMobileSafari } from "react-device-detect";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { TextField } from "~/components/elements";
import { Wrapper } from "./sign-up";
import Layout from "~/components/layout";
import { H2 } from "~/components/typography";
import { StyledLink } from "~/components/link";
import Icon from "~/components/icon";

const SignIn = () => {
	const { t } = useTranslation(["sign-in", "common"], { i18n });
	const [isSafari, setIsSafari] = useState("no");
	useEffect(() => {
		if (isMobileSafari) {
			setIsSafari("yes");
		}
	}, [isMobileSafari]);
	return (
		<Layout title="Sign In" headerType="auth">
			<StyledWrapper
				ismobilesafari={isSafari}
				style={{ height: "calc(100rvh - 60px )" }}
			>
				<H2>
					{t("common:welcome")} <span>{t("common:sign-in")}</span>
				</H2>
				<Formik
					initialValues={{
						email: "",
						password: ""
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid email address")
							.required("Email is Required"),
						password: Yup.string()
							.min(6, "Password must be at least 6 characters")
							.required("Password is Required")
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
							<div>
								<StyledTextField
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
								<StyledTextField
									name="password"
									className={errors.password ? "invalid" : null}
									type="password"
									placeholder={t("your-password") + "*"}
									autoComplete="new-password"
								/>
								<span className="error">
									{errors.password && touched.password ? (
										<span>{"*" + errors.password}</span>
									) : null}
								</span>
							</div>
							<div className="btn-wrap">
								<StyledLink
									as="button"
									type="submit"
									variant="invert"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<Icon name="spinner" size="14" />
									) : (
										<span>{t("common:sign-in")}</span>
									)}
								</StyledLink>
							</div>
						</StyledForm>
					)}
				</Formik>
			</StyledWrapper>
		</Layout>
	);
};

const StyledWrapper = styled(Wrapper)`
	${props =>
		props.ismobilesafari === "yes" &&
		css`
			@media only screen and (min-device-width: 375px) and (max-device-height: 668px) and (-webkit-min-device-pixel-ratio: 2) {
				height: 500px !important;
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
`;

const StyledForm = styled(Form)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: 80px;
`;

const StyledTextField = styled(TextField)`
	border: none;
	border-bottom: 2px solid ${props => props.theme.colors.primary};
	border-radius: 0;
	outline: none;
	&:focus {
		outline: none;
		border: none;
		border-bottom: 2px solid ${props => props.theme.colors.white};
	}
`;

SignIn.getInitialProps = async () => ({
	namespacesRequired: ["sign-in", "common"]
});

export default SignIn;
