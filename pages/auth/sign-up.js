import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { isMobileSafari } from "react-device-detect";
import styled, { css } from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import {
	Wrap100vh,
	TextField,
	ErrorMessage,
	Checkbox,
	Heading,
} from "~/components/elements";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";
import Icon from "~/components/icon";
import { register } from "~/slices/auth";
import bg from "~/assets/img/sign-up-bg.jpg";

const SignUp = () => {
	const { t } = useTranslation(["sign-up", "common"], { i18n });
	const [isSafari, setIsSafari] = useState("no");
	const language = useSelector((state) => state.language.current);
	const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();
	const isSubmitting = loading === "pending";
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
				<Heading>
					{t("common:welcome")}{" "}
					<span className="text-capitalize">{t("common:sign-up")}</span>
				</Heading>
				<Formik
					initialValues={{
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
						terms: false,
						newsletter: false,
					}}
					validationSchema={Yup.object({
						name: Yup.string().required(t("name-is-required")),
						email: Yup.string()
							.email(t("invalid-email-address"))
							.required(t("email-is-required")),
						password: Yup.string()
							.min(6, t("password-must-be-6-characters"))
							.required(t("password-is-required")),
						confirmPassword: Yup.string().oneOf(
							[Yup.ref("password"), null],
							t("passwords-must-match")
						),
						terms: Yup.boolean().oneOf([true], t("you-must-accept-tac")),
					})}
					onSubmit={(values) => {
						const data = {
							...values,
							tac: values.terms,
							legit: values.terms,
							language,
						};
						dispatch(register({ data, router }));
					}}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors }) => (
						<Form>
							<TextField
								name="name"
								className={errors.name ? "invalid" : null}
								placeholder={t("your-name") + "*"}
								autoComplete="new-password"
							/>
							<ErrorMessage>
								{errors.name ? <span>{"*" + errors.name}</span> : null}
							</ErrorMessage>
							<TextField
								name="email"
								className={errors.emai || error ? "invalid" : null}
								placeholder={t("your-email") + "*"}
								autoComplete="new-password"
							/>
							<ErrorMessage>
								{errors.email || error ? (
									<>
										{errors.email && <span>{"*" + errors.email}</span>}
										{error && <span>{"*" + error.message}</span>}
									</>
								) : null}
							</ErrorMessage>
							<TextField
								name="password"
								className={errors.password ? "invalid" : null}
								type="password"
								placeholder={t("set-password") + "*"}
								autoComplete="new-password"
							/>
							<ErrorMessage>
								{errors.password ? <span>{"*" + errors.password}</span> : null}
							</ErrorMessage>
							<TextField
								name="confirmPassword"
								className={errors.confirmPassword ? "invalid" : null}
								type="password"
								placeholder={t("confirm-password") + "*"}
								autoComplete="new-password"
							/>
							<ErrorMessage>
								{errors.confirmPassword ? (
									<span>{"*" + errors.confirmPassword}</span>
								) : null}
							</ErrorMessage>
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

export const Wrapper = styled(Wrap100vh)`
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

	${(props) =>
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
	namespacesRequired: ["sign-up", "common"],
});

export default SignUp;
