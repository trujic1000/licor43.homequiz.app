import styled from "styled-components";

export const H2 = styled.div`
	padding: 17px 0;
	font-weight: bold;
	font-size: 4.8vh;
	color: ${props => props.theme.colors.primary};
	line-height: 1;

	span {
		display: block;
		text-transform: capitalize;
		color: ${props => props.theme.colors.white};
	}
`;
