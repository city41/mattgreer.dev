import React from 'react';
import { TagFilter } from '../TagFilter';
import { Feature } from '../index/Feature';
import { Root } from '../layouts/Root';

type ProjectsPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function ProjectsPage({ tag, allTags, items }: ProjectsPageProps) {
	const headerContent = (
		<TagFilter tags={allTags} currentTag={tag} classification="projects" />
	);

	return (
		<Root
			title="Projects"
			page="portfolio"
			smallLogo
			headerContent={headerContent}
		>
			<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl -mx-8 sm:mx-auto">
				{items.map((i) => (
					<Feature key={i.slug} {...i} />
				))}
			</div>
		</Root>
	);
}

export { ProjectsPage };
