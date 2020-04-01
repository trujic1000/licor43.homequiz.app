import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import HeaderBgBig from "~/assets/img/header-bg-big.png";
import HeaderBgSmall from "~/assets/img/header-bg-small.png";
import Icon from "~/components/icon";

const Wrapper = styled.header`
	position: relative;
	background-color: ${props => props.theme.colors.secondary};
	background-image: ${props =>
		props.size === "big" ? `url(${HeaderBgBig})` : `url(${HeaderBgSmall})`};
	background-size: cover;
	background-blend-mode: lighten;
	height: 55px;
	margin-bottom: 5px;
	z-index: 5;

	svg {
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
			svg {
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
					<Icon name={size === "big" ? "logo" : "logo-alt"} />
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
