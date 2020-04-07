import React from "react";
import styled, { css } from "styled-components";
import Div100vh from "react-div-100vh";
import { useField, Field } from "formik";

export const Heading = styled.div`
	position: relative;
	padding: 17px 0;
	font-weight: bold;
	font-size: 40px;
	color: ${(props) => props.theme.colors.primary};
	line-height: 1;

	span {
		display: block;
		color: ${(props) => props.theme.colors.white};
		&.text-capitalize {
			text-transform: capitalize;
		}
	}
`;

export const Wrap100vh = styled(Div100vh)`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	z-index: 0;
`;
export const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 30px;
	z-index: 0;
`;

export const TextField = styled(Field).attrs((props) => ({
	type: props.type || "text",
}))`
	display: block;
	width: 100%;
	min-height: 45px;
	padding: 8px 15px;
	background-color: transparent;
	border: 2px solid ${(props) => props.theme.colors.primary};
	border-radius: 8px;
	text-align: center;
	font-size: 18px;
	transition: all 300ms ease;
	color: ${(props) => props.theme.colors.white};
	&.invalid {
		border-color: ${(props) => props.theme.colors.error};
	}
	&:focus {
		outline: none;
		border: 2px solid ${(props) => props.theme.colors.white};
		&::placeholder {
			color: ${(props) => props.theme.colors.white};
		}
	}
	&::placeholder {
		color: #777777;
		transition: all 300ms ease-in;
	}
	${(props) =>
		props.type === "password" &&
		css`
			letter-spacing: 5px;
			&::placeholder {
				letter-spacing: 0;
				color: #777777;
			}
		`}
`;

export const ErrorMessage = styled.span`
	display: block;
	font-size: 12px;
	text-indent: 5px;
	height: 20px;
	margin-bottom: 2px;
	color: ${(props) => props.theme.colors.error};
`;

export const Checkbox = ({ style, children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<>
			<CheckboxWrap>
				<input type="checkbox" {...field} {...props} />
				<span role="checkbox" className="checkbox" style={style} />
				{children}
			</CheckboxWrap>
			<ErrorMessage style={{ textIndent: 35 }}>
				{meta.error ? <span>{"*" + meta.error}</span> : null}
			</ErrorMessage>
		</>
	);
};

const CheckboxWrap = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	color: ${(props) => props.theme.colors.primary};
	cursor: pointer;
	font-size: 14px;
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	&:hover input ~ span.checkbox {
		background-color: transparent;
	}
	input:checked ~ span.checkbox {
		background-color: ${(props) => props.theme.colors.primary};
	}
	input:checked ~ span.checkbox::after {
		display: block;
	}
	&:last-of-type {
		font-size: 11px;
	}
	input[type="checkbox"] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
	span.checkbox {
		position: absolute;
		top: 3px;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: transparent;
		border: 1px solid ${(props) => props.theme.colors.primary};
		border-radius: 4px;
		&::after {
			content: "";
			position: absolute;
			display: none;
			left: 9px;
			top: 5px;
			width: 5px;
			height: 10px;
			border: solid black;
			border-width: 0 3px 3px 0;
			transform: rotate(45deg);
		}
	}
	a {
		color: ${(props) => props.theme.colors.white};
		text-decoration: underline;
	}
	strong {
		font-weight: bold;
	}
`;
