import React from 'react';
import { BlogPage } from '../../components/blog/BlogPage';
import { getAllBlogTags } from '../../lib/tags';
import { getAllBlogItems } from '../../lib/items';

export const config = {
	unstable_runtimeJS: false,
};

type BlogIndexNextPageProps = {
	allTags: string[];
	items: FeatureItem[];
};

export async function getStaticProps(): Promise<{
	props: BlogIndexNextPageProps;
}> {
	const allTags = getAllBlogTags();
	const items = getAllBlogItems({
		sortByDateDescending: true,
	});

	return { props: { allTags, items } };
}

export default function BlogIndexNextPage({
	allTags,
	items,
}: BlogIndexNextPageProps) {
	return <BlogPage allTags={allTags} items={items} />;
}
