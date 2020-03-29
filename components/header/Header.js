import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import HeaderBgBig from "~/assets/img/header-bg-big.png";
import HeaderBgSmall from "~/assets/img/header-bg-small.png";

const Wrapper = styled.header`
	position: relative;
	background-color: #000;
	background: ${props =>
		props.size === "big" ? `url(${HeaderBgBig})` : `url(${HeaderBgSmall})`};
	background-size: cover;
	height: 55px;

	img {
		width: 60px;
		height: 60px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 8px solid ${props => props.theme.colors.secondary};
		background: ${props => props.theme.colors.secondary};
		border-radius: 100px;
	}

	${props =>
		props.size === "big" &&
		css`
			height: 110px;
			img {
				width: 200px;
				height: 200px;
				top: 97%;
				border: none;
				background: none;
				border-radius: 0;
			}
		`}
`;

const Header = ({ size }) => {
	return (
		<Wrapper size={size}>
			<Link href="/">
				<a>
					<img
						src={size === "big" ? "/img/logo-quiz.svg" : "/img/logo.svg"}
						alt="logo"
					/>
				</a>
			</Link>
		</Wrapper>
	);
};

Header.propTypes = {
	withMenu: PropTypes.bool,
	size: PropTypes.string
};

Header.defaultProps = {
	withMenu: true,
	size: "small"
};

export default Header;
