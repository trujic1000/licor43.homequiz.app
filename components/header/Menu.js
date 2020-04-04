import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Div100vh from "react-div-100vh";

import Hamburger from "./Hamburger";
import { useTranslation, i18n } from "~/i18n";
import menuBg from "~/assets/img/menu-bg.png";

const Menu = () => {
	const [open, toggle] = useState(false);
	const { t } = useTranslation("menu", { i18n });
	const user = useSelector((state) => state.auth.user);
	return (
		<>
			<Hamburger open={open} toggle={toggle} />
			<MenuWrapper className={open ? "is-active" : null}>
				<MenuHeader>
					<span className="menu-title">{t("hosted-by")}</span>
					<span className="menu-text">{user.name || "user"}</span>
					<MenuList>
						<MenuListItem>
							<Link href="/new-game">
								<a>{t("new-game")}</a>
							</Link>
						</MenuListItem>
						<MenuListItem>
							<Link href="/share">
								<a>{t("invite-players")}</a>
							</Link>
						</MenuListItem>
						<MenuListItem>
							<Link href="/ranking">
								<a>{t("ranking")}</a>
							</Link>
						</MenuListItem>
					</MenuList>
					<MenuLogo>
						<img src="/img/logo.svg" alt="logo" />
					</MenuLogo>
				</MenuHeader>
			</MenuWrapper>
		</>
	);
};

Menu.getInitialProps = async () => ({
	namespacesRequired: ["menu"],
});

export default Menu;

const MenuWrapper = styled(Div100vh)`
	background-color: #111;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	right: 0;
	top: 0;
	width: 190px;
	z-index: 99;
	transition: all 300ms ease-in;
	transform: translateX(100%);
	padding: 60px 0 0;
	&.is-active {
		transform: translateX(0);
	}
`;

const MenuHeader = styled.div`
	min-height: 140px;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.menu-title,
	.menu-text {
		display: block;
		color: ${(props) => props.theme.colors.primary};
		text-align: center;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.menu-text {
		color: ${(props) => props.theme.colors.white};
	}
`;

const MenuList = styled.ul`
	flex: 1;
	position: relative;
	background: url(${menuBg});
	min-height: 52vh;
	background-size: 200%;
	padding: 20px 20px 0;
	line-height: 1.6;
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 0;
	}
`;

const MenuListItem = styled.li`
	position: relative;
	z-index: 1;
	a {
		position: relative;
		display: inline-block;
		transition: all 300ms ease-in;
		color: ${(props) => props.theme.colors.primary};
		font-size: 22px;
		font-weight: bold;
		margin-bottom: 12px;
	}
`;

const MenuLogo = styled.div`
	background: url(${menuBg});
	padding: 16px 0;
	img {
		display: block;
		width: 60px;
		height: 60px;
		border: 6px solid ${(props) => props.theme.colors.secondary};
		background: ${(props) => props.theme.colors.secondary};
		border-radius: 100px;
		margin: 0 auto;
	}
`;
