import React from "react";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import Link, { StyledLink } from "~/components/link";

const Category = () => {
	const { t } = useTranslation("category", { i18n });
	return (
		<Layout title="Category" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("choose")}
					<span>{t("a-category")}</span>
				</Heading>
				<CategoryWrap>
					<CategoryItem>
						<div className="category-item__img">
							<Icon name="quotes" />
						</div>
						<div className="category-item__text">How would you call?</div>
					</CategoryItem>
					<CategoryItem>
						<div className="category-item__img">
							<Icon name="eye" />
						</div>
						<div className="category-item__text">What can you see?</div>
					</CategoryItem>
					<CategoryItem>
						<div className="category-item__img">
							<Icon name="ear" />
						</div>
						<div className="category-item__text">What is this sound?</div>
					</CategoryItem>
					<CategoryItem>
						<div className="category-item__img">
							<Icon name="trig" />
						</div>
						<div className="category-item__text">What is it made of?</div>
					</CategoryItem>
				</CategoryWrap>
			</Wrapper>
		</Layout>
	);
};

Category.getInitialProps = async () => ({
	namespacesRequired: ["category"],
});

export default Category;

const Wrapper = styled(Wrap100vh)`
	padding: 0 30px;
`;

const CategoryWrap = styled.div`
	flex: 1;
	margin-top: 20px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-gap: 15px;
`;

const CategoryItem = styled.div`
	.category-item__img {
		background-color: ${(props) => props.theme.colors.primary};
		width: 118px;
		height: 118px;
		margin: 0 auto 7px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
		}
	}

	.category-item__text {
		text-align: center;
		color: ${(props) => props.theme.colors.primary};
		display: block;
		width: 90%;
		margin: 0 auto;
		font-size: 22px;
		line-height: 1;
	}
`;
