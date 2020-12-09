import React from 'react';
import { ProjectsPage } from '../../components/projects/ProjectsPage';
import { getAllProjectTags } from '../../lib/tags';
import { getAllProjectItems } from '../../lib/items';

export const config = {
	unstable_runtimeJS: false,
};

type ProjectsIndexNextPageProps = {
	allTags: TagLabel[];
	items: PortfolioItem[];
};

export async function getStaticProps(): Promise<{
	props: ProjectsIndexNextPageProps;
}> {
	const allTags = getAllProjectTags();
	const items = getAllProjectItems();

	return { props: { allTags, items } };
}

export default function ProjectsIndexNextPage({
	allTags,
	items,
}: ProjectsIndexNextPageProps) {
	return <ProjectsPage allTags={allTags} items={items} />;
}
