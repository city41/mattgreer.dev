import React from 'react';
import { TagFilter } from '../TagFilter';
import { Feature } from '../Feature';
import { Root } from '../layouts/Root';

import laptopSvg from './laptop.svg';
import laptopPng from './laptop.png';

type ProjectsPageProps = {
	tag?: string;
	allTags: string[];
	items: FeatureItem[];
};

function ProjectsPage({ tag, allTags, items }: ProjectsPageProps) {
	const headerContent = (
		<TagFilter
			tags={allTags}
			currentTag={tag}
			classification="projects"
			count={items.length}
		/>
	);

	return (
		<Root
			headTitle="Projects"
			metaDescription="Things I have created, mostly webapps"
			img={laptopSvg}
			socialMediaImg={laptopPng.src}
			imgAlt="Illustration of a laptop"
			navigation
			headerContent={headerContent}
			headerContentUnderTitle
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
