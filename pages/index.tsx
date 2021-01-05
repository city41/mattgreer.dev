import React from 'react';
import { IndexPage } from '../components/index/IndexPage';
import { getAllItems } from '../lib/items';

export const config = {
	unstable_runtimeJS: false,
};

type IndexNextPageProps = {
	items: FeatureItem[];
};

export async function getStaticProps(): Promise<{
	props: IndexNextPageProps;
}> {
	const items = getAllItems();

	const featuredItems = items.filter((item) => item.featureIndex > -1);
	const sortedFeatureItems = featuredItems.sort((a, b) => {
		if (a.featureIndex === b.featureIndex) {
			throw new Error(
				`Found two featured items with the same featureIndex: ${a.slug} and ${b.slug}`
			);
		}

		return a.featureIndex - b.featureIndex;
	});

	return { props: { items: sortedFeatureItems } };
}

export default function IndexNextPage({ items }: IndexNextPageProps) {
	return <IndexPage items={items} />;
}
