import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	Wrap100vh,
	Heading,
	TextField,
	Checkbox,
	ErrorMessage,
} from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import { StyledLink } from "~/components/link";

const GuestWelcome = () => {
	const router = useRouter();
	return (
		<Layout title="Guest Welcome" headerType="welcome">
			<Wrapper style={{ height: "calc(100rvh - 236px)" }}>
				<Heading>Welcome</Heading>
				<span className="text-big">
					You have been invited to the most creative quiz game ever
				</span>
				<span className="text-medium">
					Please <span className="text-white">insert your name</span>
				</span>
				<Formik
					initialValues={{
						name: "",
						terms: false,
					}}
					validationSchema={Yup.object({
						name: Yup.string().required("Name is required"),
						terms: Yup.boolean().oneOf(
							[true],
							"You must accept Terms & Conditions"
						),
					})}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
							router.push("/guest-rules");
						}, 1000);
					}}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ errors, touched, isSubmitting }) => (
						<StyledForm>
							<div>
								<TextField
									name="name"
									className={errors.name ? "invalid" : null}
									placeholder={"Your Name*"}
									autoComplete="new-password"
								/>
								<ErrorMessage style={{ marginBottom: 5 }}>
									{errors.name && touched.name ? (
										<span>{"*" + errors.name}</span>
									) : null}
								</ErrorMessage>
								<Checkbox name="terms" style={{ top: -3 }}>
									I confirm I am over 18 years old and I accept the{" "}
									<Link href="/terms-and-conditions">
										<a className="color-white">Terms and Conditions</a>
									</Link>
								</Checkbox>
							</div>
							<StyledLink as="button" type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<Icon name="spinner" size="14" />
								) : (
									<span>Continue</span>
								)}
							</StyledLink>
						</StyledForm>
					)}
				</Formik>
			</Wrapper>
		</Layout>
	);
};

export default GuestWelcome;

const Wrapper = styled(Wrap100vh)`
	align-items: center;
	padding: 0 30px;
	margin-top: 100px;
	margin-bottom: 20px;
	font-weight: bold;

	span.text-big {
		display: block;
		width: 90%;
		margin: 0 auto 20px auto;
		font-size: 20px;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1.3;
	}
	.text-medium {
		font-size: 20px;
		margin-bottom: 20px;
		.text-white {
			color: ${(props) => props.theme.colors.white};
		}
	}
	button {
		margin: 0 auto;
	}
	input {
		background-color: transparent !important;
		border: 2px solid ${(props) => props.theme.colors.primary} !important;
		transition: 0.3s ease-in !important;
		color: ${(props) => props.theme.colors.primary} !important;
		padding-left: 0 !important;
		text-align: center !important;
		&:focus {
			outline: none !important;
			border: 2px solid ${(props) => props.theme.colors.white} !important;
		}
	}
`;

const StyledForm = styled(Form)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
