import React from 'react';
import {
	GetStaticPropsContext,
	GetStaticPathsContext,
	GetStaticPathsResult,
} from 'next';
import { ProjectsPage } from '../../components/projects/ProjectsPage';
import { getAllProjectTags } from '../../lib/tags';
import { getAllProjectItems } from '../../lib/items';

type TagProjectsNextPageProps = {
	tag: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function findMatchingTag(tagString: string): TagLabel {
	// TODO: this is reading from the file system every time
	const allTags = getAllProjectTags();

	return allTags.find((tag) => tag.toLowerCase() === tagString);
}

export async function getStaticPaths(
	_context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
	const tags = getAllProjectTags() as string[];
	const tagsLowercase = tags.map((t) => t.toLowerCase());

	const allTags = Array.from(new Set(tags.concat(tagsLowercase)));
	const paths = allTags.map((tag) => ({ params: { tag } }));

	return { paths, fallback: false };
}

export async function getStaticProps(
	context: GetStaticPropsContext
): Promise<{ props: TagProjectsNextPageProps }> {
	const currentTagParam = (context.params.tag as string).toLowerCase();
	const currentTag = findMatchingTag(currentTagParam);

	const allTags = getAllProjectTags();
	const items = getAllProjectItems();

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
}: TagProjectsNextPageProps) {
	return <ProjectsPage tag={tag} allTags={allTags} items={items} />;
}
