import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const Checkbox = ({ style, children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<>
			<CheckboxWrap>
				<input type="checkbox" {...field} {...props} />
				<span role="checkbox" className="checkbox" style={style} />
				{children}
			</CheckboxWrap>
			<span className="error" style={{ textIndent: 35 }}>
				{meta.touched && meta.error ? <span>{"*" + meta.error}</span> : null}
			</span>
		</>
	);
};

const CheckboxWrap = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	color: ${props => props.theme.colors.primary};
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
		background-color: ${props => props.theme.colors.primary};
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
		border: 1px solid ${props => props.theme.colors.primary};
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
		color: ${props => props.theme.colors.white};
		text-decoration: underline;
	}
	strong {
		font-weight: bold;
	}
`;

export default Checkbox;
