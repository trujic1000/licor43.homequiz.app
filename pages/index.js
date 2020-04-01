import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "~/components/layout";
import { withTranslation } from "../i18n";
import wcBg from "~/assets/img/wc-bg.png";
import wcOverlay from "~/assets/img/wc-bg-overlay.png";
import wc1 from "~/assets/img/wc-1.png";
import wc2 from "~/assets/img/wc-2.png";
import wc3 from "~/assets/img/wc-3.png";
import wc4 from "~/assets/img/wc-4.png";
import flagSpain from "~/assets/img/flag-spain.png";
import flagUk from "~/assets/img/flag-uk.png";

const WelcomeLayout = styled.div`
	position: relative;
	display: grid;
	height: 60vh;
	margin-top: 10px;
	background-image: url(${wcBg});
	&::before {
		content: "";
		z-index: 1;
		position: absolute;
		top: 4px;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		background-image: url(${wcOverlay});
		background-position: center center;
		background-size: cover;

		@media (min-height: ${props => props.theme.mediaQueries.medium}) {
			top: 1px;
			height: 99.7%;
		}
		@media (min-height: ${props => props.theme.mediaQueries.large}) {
			top: 2px;
			height: 100%;
		}
	}

	.item {
		position: relative;
		background-size: cover;
		background-position: center center;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.item--1 {
		grid-row: span 4;
		background-image: url(${wc1});
		span.welcome {
			color: ${props => props.theme.colors.primary};
			font-size: 38px;
			line-height: 1.2;
			text-align: center;
			font-weight: bold;
		}
	}
	.item--2 {
		grid-row: span 4;
		background-image: url(${wc2});
	}
	.item--3 {
		grid-row: span 3;
		background-image: url(${wc3});
		span {
			position: absolute;
			font-size: 12px;
			font-weight: normal;
			top: initial;
			bottom: -12px;
			width: 140%;
			left: 35%;
			color: ${props => props.theme.colors.primary};
			line-height: 1.2;
			z-index: 5;
			text-align: center;
		}
	}
	.item--4 {
		grid-row: span 3;
		background-image: url(${wc4});
	}
`;

const TextWrap = styled.div`
	z-index: 2;
	position: absolute;
	top: 4px;
	left: 0;
	height: 100%;
	width: 100%;
	text-align: center;
	font-size: 25px;
	line-height: 1.1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-weight: bold;
	.color-primary {
		color: ${props => props.theme.colors.primary};
	}
	.color-white {
		color: ${props => props.theme.colors.white};
	}
	.mb-10 {
		margin-bottom: 10px;
	}
	.mt-10 {
		margin-top: 10px;
	}
	span.text-large {
		font-size: 1em;
		padding: 5px 25px;
	}
	span.text-medium {
		font-size: 0.65em;
		padding: 3px 25px;
	}
	span.text-small {
		display: block;
		font-size: 0.75em;
		font-weight: normal;
	}
`;

const Footer = styled.div`
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media (min-height: ${props => props.theme.mediaQueries.medium}) {
		height: 180px;
	}
	@media (min-height: ${props => props.theme.mediaQueries.large}) {
		height: 210px;
	}

	span {
		text-transform: uppercase;
		font-size: 12px;
		margin-bottom: 10px;
	}

	.button-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 67px;
			margin: 0 5px;
			border-radius: 50%;
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			-ms-border-radius: 50%;
			-o-border-radius: 50%;
			border: 2px solid ${props => props.theme.colors.primary};
		}
	}
`;

const Index = () => (
	<Layout title="Home" headerType="home">
		<WelcomeLayout>
			<TextWrap>
				<span className="text-large color-primary">
					Play with your friends Remotely.
				</span>
				<span className="text-large color-white mb-10">
					Juega con tus amigos Remotamente.{" "}
				</span>
				<span className="text-medium color-primary">
					Sign In. Share your code with friends.
					<span className="text-small">
						(Everyone can join. No need to download)
					</span>
				</span>
				<span className="text-medium color-primary">Choose your category.</span>
				<span className="text-medium color-primary">
					Try your most creative answer.
					<span className="text-small">(No right or wrong answers)</span>
				</span>
				<span className="text-medium color-primary">
					Get the votes to become the winner.
				</span>
				<span
					className="text-medium color-white mt-10"
					style={{ padding: "5px 10px" }}
				>
					Regístrate. Comparte tu código con amigos.
					<span className="text-small">
						(Todos pueden unirse. No necesita descarga)
					</span>
				</span>
				<span className="text-medium color-white">Elige una categoría.</span>
				<span className="text-medium color-white">
					Intenta tu respuesta más creativa.
					<span className="text-small">
						(No hay respuestas correctas o incorrectas)
					</span>
				</span>
				<span className="text-medium color-white">
					Consigue los votos y sé el ganador.
				</span>
			</TextWrap>
		</WelcomeLayout>
		<Footer>
			<span>Choose your langauge to continue</span>
			<div className="button-wrap">
				<Link href="/auth">
					<a onClick={() => console.log("clicked on spain")}>
						<img src={flagSpain} alt="flag-spain" />
					</a>
				</Link>
				<Link href="/auth">
					<a onClick={() => console.log("clicked on uk")}>
						<img src={flagUk} alt="flag-uk" />
					</a>
				</Link>
			</div>
		</Footer>
	</Layout>
);

Index.getInitialProps = async () => ({
	namespacesRequired: ["common", "menu"]
});

export default withTranslation("menu")(Index);
