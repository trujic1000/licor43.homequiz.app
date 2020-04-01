import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

const MyLink = ({ href, onClick, children, ...props }) => {
	return (
		<Link href={href} passHref>
			<StyledLink onClick={onClick} {...props}>
				{children}
			</StyledLink>
		</Link>
	);
};

export default MyLink;

export const StyledLink = styled.a`
	display: inline-block;
	max-width: 240px;
	width: 100%;
	margin: 0 auto 10px auto;
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.secondary};
	padding: ${props => (props.as === "button" ? "12px 35px" : "10px 35px")};
	text-align: center;
	font-size: 15px;
	font-family: "Roboto", sans-serif;
	font-weight: bold;
	border: 3px solid transparent;
	border-radius: 40px;
	transition: 0.3s ease;
	&:hover {
		background-color: #000;
		color: ${props => props.theme.colors.primary};
	}
	&:focus {
		outline: none;
	}

	${props =>
		props.color === "white" &&
		css`
			background-color: ${props => props.theme.colors.white};
			color: ${props => props.theme.colors.secondary};
			border: 2px solid ${props => props.theme.colors.white};
			&:hover {
				background-color: ${props => props.theme.colors.secondary};
				color: ${props => props.theme.colors.white};
				border: 2px solid ${props => props.theme.colors.white};
			}
		`}

	${props =>
		props.color === "green" &&
		css`
			background-color: #1db954;
			color: ${props => props.theme.colors.white};
			border: 2px solid #1db954;
			&:hover {
				background-color: ${props => props.theme.colors.white};
				color: #1db954;
				border: 2px solid #1db954;
			}
		`}

  ${props =>
		props.type === "invert" &&
		css`
			background-color: ${props => props.theme.colors.secondary};
			color: ${props => props.theme.colors.primary};
			border: 3px solid ${props => props.theme.colors.primary};
			&:hover {
				background-color: ${props => props.theme.colors.primary};
				color: ${props => props.theme.colors.secondary};
			}
		`}

  ${props =>
		props.type === "facebook" &&
		css`
			display: flex;
			align-items: center;
			text-align: left;
			font-weight: normal;
			background-color: #3b5998;
			color: ${props => props.theme.colors.white};
			padding: 4px 7px;
			margin-bottom: 10px;

			svg {
				width: 35px;
				height: 35px;
				margin-right: 10px;
			}
		`}
`;
