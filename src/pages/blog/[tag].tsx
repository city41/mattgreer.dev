import React from 'react';
import {
	GetStaticPropsContext,
	GetStaticPathsContext,
	GetStaticPathsResult,
} from 'next';
import { BlogPage } from '../../components/blog/BlogPage';
import { getAllBlogTags } from '../../lib/tags';
import { getAllBlogItems } from '../../lib/items';

export const config = {
	unstable_runtimeJS: false,
};

type TagBlogNextPageProps = {
	tag: string;
	allTags: string[];
	items: FeatureItem[];
};

function findMatchingTag(tagString: string): string {
	// TODO: this is reading from the file system every time
	const allTags = getAllBlogTags();

	return allTags.find((tag) => tag.toLowerCase() === tagString);
}

export async function getStaticPaths(
	_context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
	const tags = getAllBlogTags();
	const tagsLowercase = tags.map((t) => t.toLowerCase());

	const allTags = Array.from(new Set(tags.concat(tagsLowercase)));
	const paths = allTags.map((tag) => ({ params: { tag } }));

	return { paths, fallback: false };
}

export async function getStaticProps(
	context: GetStaticPropsContext
): Promise<{ props: TagBlogNextPageProps }> {
	const currentTagParam = (context.params.tag as string).toLowerCase();
	const currentTag = findMatchingTag(currentTagParam);

	const allTags = getAllBlogTags();
	const items = getAllBlogItems({
		sortByDateDescending: true,
	});

	const matchingItems = items.filter((item) => {
		return item.tags.some(
			(itemTag) => itemTag.toLowerCase() === currentTagParam
		);
	});

	return {
		props: {
			tag: currentTag,
			allTags,
			items: matchingItems,
		},
	};
}

export default function TagProjectsNextPage({
	tag,
	allTags,
	items,
}: TagBlogNextPageProps) {
	return <BlogPage tag={tag} allTags={allTags} items={items} />;
}
