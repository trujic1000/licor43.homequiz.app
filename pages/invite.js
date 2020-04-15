import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { SITE_URL } from "~/utils";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import Link, { StyledLink } from "~/components/link";

const Invite = () => {
	const { t } = useTranslation("invite", { i18n });
	const code = useSelector((state) => state.quiz.code);
	return (
		<Layout title="Terms and Conditions" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("lets-set-up")}
					<span>{t("the-basics")}</span>
				</Heading>
				<CodeWrapper>
					<CopyToClipboard text={`${SITE_URL}/guest-join/${code}`}>
						<button
							className="copy-to-clipboard"
							onClick={() => {
								toast(`Invitation link coppied to clipboard`, {
									type: toast.TYPE.WARNING,
									autoClose: 2000,
								});
							}}
						>
							<Icon name="copy" size="20" />
						</button>
					</CopyToClipboard>
					<div className="quiz-share__code">
						<span className="quiz-share__code-number">{code[0]}</span>
						<span className="quiz-share__code-number">{code[1]}</span>
						<span className="quiz-share__code-number">{code[2]}</span>
						<span className="quiz-share__code-number">{code[3]}</span>
					</div>
					<ol className="quiz-share__text">
						<li>Copy the invitation link</li>
						<li>Send it to your friends</li>
						<li>Wait for them to join</li>
						<li>Let the game begin!</li>
						{/* <a href="#">Licor43.HomeQuiz.App</a>
						<span>{t("and-use-the-code-above")}</span> */}
					</ol>
				</CodeWrapper>
				<ButtonWrap>
					<StyledLink
						variant="whatsapp"
						target="_blank"
						href={`https://wa.me/?text=${SITE_URL}/guest-join/${code}`}
					>
						{t("share-using-whatsapp")}
					</StyledLink>
					{/* TODO: Disable button until a player connected */}
					<Link href="/category">{t("let-the-game-begin")}</Link>
				</ButtonWrap>
			</Wrapper>
		</Layout>
	);
};

Invite.getInitialProps = async () => ({
	namespacesRequired: ["invite"],
});

export default Invite;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
`;

const ButtonWrap = styled.div`
	display: grid;
	margin-bottom: 10px;
	button {
		margin: 10px auto;
	}
`;

const CodeWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	.copy-to-clipboard {
		background: ${(props) => props.theme.colors.white};
		border: none;
		border-radius: 10px;
		outline: none;
		padding: 5px 8px;
		position: absolute;
		top: -30px;
		right: 0;
	}
  .quiz-share__code {
    display: flex;
   justify-content: center;
  }
  .quiz-share__code-number {
  display: block;
  width: 50px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  color: #000;
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
  font-size: 38px;
  font-weight: bold;
  line-height: 1;
}
.quiz-share__text {
	list-style-type: decimal;
  margin-top: 40px;
  color: ${(props) => props.theme.colors.primary};
  span {
    display: block;
    line-height: 1;
  }
  a {
    color: ${(props) => props.theme.colors.white};
    line-height: 1;
  }
`;
