import React from 'react';
import { PortfolioPage } from '../../components/portfolio/PortfolioPage';
import { getAllPortfolioTags } from '../../lib/getAllPortfolioTags';
import { getAllPortfolioItems } from '../../lib/getAllPortfolioItems';

type PortfolioNextPageProps = {
	allTags: TagLabel[];
	items: PortfolioItem[];
};

export async function getStaticProps(): Promise<{
	props: PortfolioNextPageProps;
}> {
	const allTags = getAllPortfolioTags();
	const items = getAllPortfolioItems();

	return { props: { allTags, items } };
}

export default function PortfolioNextPage({
	allTags,
	items,
}: PortfolioNextPageProps) {
	return <PortfolioPage allTags={allTags} items={items} />;
}
