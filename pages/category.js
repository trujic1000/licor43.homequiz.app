import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation, i18n } from "~/i18n";
import { Wrap100vh, Heading } from "~/components/elements";
import Layout from "~/components/layout";
import Icon from "~/components/icon";
import { setCategoryId, getQuestion } from "~/slices/quiz";
const Category = () => {
	const { t } = useTranslation("category", { i18n });
	const router = useRouter();
	const dispatch = useDispatch();

	const quiz_id = useSelector((state) => state.quiz.id);
	return (
		<Layout title="Category" headerType="quiz">
			<Wrapper style={{ height: "calc(100rvh - 140px)" }}>
				<Heading>
					{t("choose")}
					<span>{t("a-category")}</span>
				</Heading>
				<CategoryWrap>
					<CategoryItem
						onClick={() => {
							dispatch(setCategoryId(1));
							dispatch(
								getQuestion({
									data: {
										quiz_id,
										category: 1,
									},
									router,
								})
							);
						}}
					>
						<div className="category-item__img">
							<Icon name="quotes" />
						</div>
						<div className="category-item__text">{t("how-would-you-call")}</div>
					</CategoryItem>
					<CategoryItem
						onClick={() => {
							dispatch(setCategoryId(2));
							dispatch(
								getQuestion({
									data: {
										quiz_id,
										category: 2,
									},
									router,
								})
							);
						}}
					>
						<div className="category-item__img">
							<Icon name="eye" />
						</div>
						<div className="category-item__text">{t("what-can-you-see")}</div>
					</CategoryItem>
					<CategoryItem
						onClick={() => {
							dispatch(setCategoryId(3));
							dispatch(
								getQuestion({
									data: {
										quiz_id,
										category: 3,
									},
									router,
								})
							);
						}}
					>
						<div className="category-item__img">
							<Icon name="ear" />
						</div>
						<div className="category-item__text">{t("what-is-this-sound")}</div>
					</CategoryItem>
					<CategoryItem
						onClick={() => {
							dispatch(setCategoryId(4));
							dispatch(
								getQuestion({
									data: {
										quiz_id,
										category: 4,
									},
									router,
								})
							);
						}}
					>
						<div className="category-item__img">
							<Icon name="trig" />
						</div>
						<div className="category-item__text">{t("what-is-it-made-of")}</div>
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

const CategoryItem = styled.button`
	background: transparent;
	border: none;
	outline: none;
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
