import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Link, { StyledLink } from "~/components/link";

const Invite = () => {
	const { t } = useTranslation("invite", { i18n });
	const dispatch = useDispatch();
	const code = useSelector((state) => state.quiz.code);
	return (
		<Layout title="Terms and Conditions" headerType="quiz-no-menu">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("lets-set-up")}
					<span>{t("the-basics")}</span>
				</Heading>
				<CodeWrapper>
					<div className="quiz-share__code">
						<span className="quiz-share__code-number">{code[0]}</span>
						<span className="quiz-share__code-number">{code[1]}</span>
						<span className="quiz-share__code-number">{code[2]}</span>
						<span className="quiz-share__code-number">{code[3]}</span>
					</div>
					<div className="quiz-share__text">
						<span>{t("ask-your-friends-to-visit")}</span>
						<a href="#">Licor43.HomeQuiz.App</a>
						<span>{t("and-use-the-code-above")}</span>
					</div>
				</CodeWrapper>
				<ButtonWrap>
					<StyledLink
						variant="whatsapp"
						target="_blank"
						href={`https://wa.me/?text=https://licor43.homequiz.app/join code: 1234`}
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
  margin-top: 40px;
  text-align: center;
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
