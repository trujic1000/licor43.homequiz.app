import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { isMobileSafari } from "react-device-detect";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { TextField, ErrorMessage, Heading } from "~/components/elements";
import { Wrapper } from "./sign-up";
import { login } from "~/slices/auth";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";
import Icon from "~/components/icon";

const SignIn = () => {
	const { t } = useTranslation(["sign-in", "common"], { i18n });
	const [isSafari, setIsSafari] = useState("no");
	const dispatch = useDispatch();
	const router = useRouter();
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
				<Heading>
					{t("common:welcome")}{" "}
					<span className="text-capitalize">{t("common:sign-in")}</span>
				</Heading>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email(t("invalid-email-address"))
							.required(t("email-is-required")),
						password: Yup.string().required(t("password-is-required")),
					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(login({ data: values, router }));
						// setTimeout(() => {
						// 	alert(JSON.stringify(values, null, 2));
						// 	setSubmitting(false);
						// }, 1000);
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
								<ErrorMessage>
									{errors.email ? <span>{"*" + errors.email}</span> : null}
								</ErrorMessage>
								<StyledTextField
									name="password"
									className={errors.password ? "invalid" : null}
									type="password"
									placeholder={t("your-password") + "*"}
									autoComplete="new-password"
								/>
								<ErrorMessage>
									{errors.password ? (
										<span>{"*" + errors.password}</span>
									) : null}
								</ErrorMessage>
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
	${(props) =>
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
	border-bottom: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 0;
	outline: none;
	&:focus {
		outline: none;
		border: none;
		border-bottom: 2px solid ${(props) => props.theme.colors.white};
	}
`;

SignIn.getInitialProps = async () => ({
	namespacesRequired: ["sign-in", "common"],
});

export default SignIn;
