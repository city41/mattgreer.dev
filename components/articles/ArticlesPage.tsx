import React from 'react';
import { TagFilter } from '../TagFilter';
import { Feature } from '../Feature';
import { Root } from '../layouts/Root';

import laptopSvg from './laptop.svg';

type ArticlesPageProps = {
	tag?: string;
	allTags: string[];
	items: FeatureItem[];
};

function ArticlesPage({ tag, allTags, items }: ArticlesPageProps) {
	const headerContent = (
		<TagFilter
			tags={allTags}
			currentTag={tag}
			classification="articles"
			count={items.length}
		/>
	);

	return (
		<Root
			title="Articles"
			currentNav="/articles"
			metaDescription="Technical articles I have written, mostly related to web tech"
			img={laptopSvg}
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

export { ArticlesPage };
