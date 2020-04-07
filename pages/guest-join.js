import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import ReactCodeInput from "react-code-input";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import { StyledLink } from "~/components/link";

const Join = () => {
	const [code, setCode] = useState("");
	const router = useRouter();
	const { t } = useTranslation(["guest-welcome", "common"], {
		i18n,
	});
	return (
		<Layout title="Guest Join" headerType="welcome">
			<Wrapper style={{ height: "calc(100rvh - 236px)" }}>
				<Heading>{t("common:welcome")}</Heading>
				<span className="text-big">{t("you-have-been-invited")}</span>
				<span className="text-medium">
					{t("please")}{" "}
					<span className="text-white">{t("insert-game-code")}</span>
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
					<span>{t("common:join-the-game")}</span>
				</StyledLink>
			</Wrapper>
		</Layout>
	);
};

Join.getInitialProps = async () => ({
	namespacesRequired: ["guest-welcome", "common"],
});

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
