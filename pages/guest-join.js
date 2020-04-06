import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ReactCodeInput from "react-code-input";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";

const Join = () => {
	const [code, setCode] = useState("");
	const router = useRouter();
	return (
		<Layout title="Guest Join" headerType="welcome">
			<Wrapper style={{ height: "calc(100rvh - 236px)" }}>
				<Heading>Welcome</Heading>
				<span className="text-big">
					You have been invited to the most creative quiz game ever
				</span>
				<span className="text-medium">
					Please <span className="text-white">insert game code</span>
				</span>
				<ReactCodeInput
					forceUppercase
					value={code}
					onChange={(code) => setCode(code)}
				/>
				<StyledLink
					as="button"
					type="submit"
					onClick={() => {
						router.push("/guest-welcome");
					}}
				>
					<span>Join the Game</span>
				</StyledLink>
			</Wrapper>
		</Layout>
	);
};

export default Join;

const Wrapper = styled(Wrap100vh)`
	align-items: center;
	padding: 0 30px;
	margin-top: 100px;
	margin-bottom: 20px;
	font-weight: bold;

	span.text-big {
		display: block;
		width: 90%;
		margin: 0 auto;
		font-size: 20px;
		font-weight: bold;
		color: ${(props) => props.theme.colors.primary};
		line-height: 1.3;
	}
	.text-medium {
		font-size: 20px;
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
