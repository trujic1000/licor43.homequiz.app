import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Hamburger = ({ open, toggle }) => {
	return (
		<Wrapper>
			<HamburgerButton
				type="button"
				className={open ? "is-active" : null}
				onClick={() => toggle((prevState) => !prevState)}
			>
				<HamburgerBox>
					<HamburgerInner className="hamburger-inner" />
				</HamburgerBox>
			</HamburgerButton>
		</Wrapper>
	);
};

Hamburger.propTypes = {
	open: PropTypes.bool,
	toggle: PropTypes.func.isRequired,
};

export default Hamburger;

const Wrapper = styled.div`
	background: #151515;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 55px;
	position: absolute;
	top: 17px;
	right: 32px;
	z-index: 3;
`;

const HamburgerButton = styled.button`
	padding: 15px 15px;
	display: inline-block;
	cursor: pointer;
	transition: all 300ms linear;
	font: inherit;
	color: inherit;
	text-transform: none;
	background-color: transparent;
	border: 0;
	margin: 0;
	overflow: visible;
	outline: none;
	&.is-active .hamburger-inner,
	&.is-active .hamburger-inner::before,
	&.is-active .hamburger-inner::after {
		background-color: ${(props) => props.theme.colors.primary};
	}
	&.is-active .hamburger-inner {
		transform: translate3d(0, 10px, 0) rotate(45deg);
	}
	&.is-active .hamburger-inner::before {
		transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
		opacity: 0;
	}
	&.is-active .hamburger-inner::after {
		transform: translate3d(0, -20px, 0) rotate(-90deg);
	}
`;

const HamburgerBox = styled.span`
	width: 40px;
	height: 24px;
	margin-top: 5px;
	display: inline-block;
	position: relative;
`;

const HamburgerInner = styled.span`
	display: block;
	top: 50%;
	margin-top: -2px;
	width: 40px;
	height: 4px;
	background-color: ${(props) => props.theme.colors.primary};
	border-radius: 4px;
	position: absolute;
	top: 2px;
	transition: all 300ms ease;

	&::before,
	&::after {
		content: "";
		display: block;
		width: 40px;
		height: 4px;
		background-color: ${(props) => props.theme.colors.primary};
		border-radius: 4px;
		position: absolute;
		transition: all 300ms ease;
	}
	&::before {
		top: 10px;
		transition: all 300ms ease;
	}
	&::after {
		top: 20px;
	}
`;
