import React from 'react';
import {
	GetStaticPropsContext,
	GetStaticPathsContext,
	GetStaticPathsResult,
} from 'next';
import { PortfolioPage } from '../../components/portfolio/PortfolioPage';
import { getAllPortfolioTags } from '../../lib/getAllPortfolioTags';
import { getAllPortfolioItems } from '../../lib/getAllPortfolioItems';

type TagPortfolioNextPageProps = {
	tag: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function findMatchingTag(tagString: string): TagLabel {
	// TODO: this is reading from the file system every time
	const allTags = getAllPortfolioTags();

	return allTags.find((tag) => tag.toLowerCase() === tagString);
}

export async function getStaticPaths(
	_context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
	const tags = getAllPortfolioTags() as string[];
	const tagsLowercase = tags.map((t) => t.toLowerCase());

	const allTags = Array.from(new Set(tags.concat(tagsLowercase)));
	const paths = allTags.map((tag) => ({ params: { tag } }));

	return { paths, fallback: false };
}

export async function getStaticProps(
	context: GetStaticPropsContext
): Promise<{ props: TagPortfolioNextPageProps }> {
	const currentTagParam = (context.params.tag as string).toLowerCase();
	const currentTag = findMatchingTag(currentTagParam);

	const allTags = getAllPortfolioTags();
	const items = getAllPortfolioItems();

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

export default function TagPortfolioNextPage({
	tag,
	allTags,
	items,
}: TagPortfolioNextPageProps) {
	return <PortfolioPage tag={tag} allTags={allTags} items={items} />;
}
