import React from 'react';
import { ArticlesPage } from '../../components/articles/ArticlesPage';
import { getAllArticleTags } from '../../lib/tags';
import { getAllArticleItems } from '../../lib/items';

type ArticlesIndexNextPageProps = {
	allTags: TagLabel[];
	items: PortfolioItem[];
};

export async function getStaticProps(): Promise<{
	props: ArticlesIndexNextPageProps;
}> {
	const allTags = getAllArticleTags();
	const items = getAllArticleItems();

	return { props: { allTags, items } };
}

export default function ProjectsIndexNextPage({
	allTags,
	items,
}: ArticlesIndexNextPageProps) {
	return <ArticlesPage allTags={allTags} items={items} />;
}
