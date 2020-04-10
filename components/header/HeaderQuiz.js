import React from "react";
import Link from "next/link";
import styled from "styled-components";

import HeaderBgSmall from "~/assets/img/header-bg-small.png";

const Header = () => {
	return (
		<Wrapper>
			<Link href="/rules">
				<a className="quiz-logo-wrap">
					<img src="/img/logo-quiz.svg" alt="logo" />
				</a>
			</Link>
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.header`
	position: relative;
	background-color: ${(props) => props.theme.colors.secondary};
	background: url(${HeaderBgSmall});
	background-size: cover;
	background-repeat: no-repeat;
	background-blend-mode: lighten;
	mix-blend-mode: lighten;
	height: 55px;
	margin-bottom: 80px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 32px;
	z-index: 1;

	a.quiz-logo-wrap {
		width: 126px;
		height: 126px;
		align-self: end;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1c1c1c;
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);

		img {
			width: 110px;
			margin: 0 auto;
			transform: rotate(-45deg);
		}
	}
`;
