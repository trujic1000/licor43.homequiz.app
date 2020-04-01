import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Header from "~/assets/img/header-home.png";
import Icon from "~/components/icon";

const Wrapper = styled.header`
	position: relative;
	background-color: ${props => props.theme.colors.secondary};
	background: url(${Header});
	background-size: cover;
	height: 110px;
	z-index: 5;

	.header-home__logo-wrap {
		width: 115px;
		height: 115px;
		border: 8px solid ${props => props.theme.colors.secondary};
		background: ${props => props.theme.colors.secondary};
		border-radius: 100px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			height: 90px;
			width: 90px;
		}
	}
`;

const HeaderHome = () => {
	return (
		<Wrapper>
			<Link href="/">
				<a>
					<div className="header-home__logo-wrap">
						<Icon name="logo" />
					</div>
				</a>
			</Link>
		</Wrapper>
	);
};

export default HeaderHome;
