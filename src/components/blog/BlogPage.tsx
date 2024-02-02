import React from 'react';
import { TagFilter } from '../TagFilter';
import { BlogFeature } from './BlogFeature';
import { Root } from '../layouts/Root';

import laptopSvg from '../articles/laptop.svg';
import laptopPng from '../articles/laptop.png';

type BlogPageProps = {
	tag?: string;
	allTags: string[];
	items: FeatureItem[];
};

function BlogPage({ tag, allTags, items }: BlogPageProps) {
	const headerContent = (
		<TagFilter
			tags={allTags}
			currentTag={tag}
			classification="blog"
			count={items.length}
		/>
	);

	return (
		<Root
			headTitle="Blog"
			metaDescription="My blog, mostly focused on game and web dev"
			img={laptopSvg.src}
			socialMediaImg={laptopPng.src}
			imgAlt="Illustration of a laptop"
			navigation
			headerContent={headerContent}
			headerContentUnderTitle
		>
			<div className="flex flex-col sm:space-y-8 overflow-x-hidden max-w-2xl -mx-12 sm:mx-auto">
				{items.map((i) => (
					<BlogFeature
						className="even:bg-bg-fade p-8 sm:p-4"
						key={i.slug}
						{...i}
					/>
				))}
			</div>
		</Root>
	);
}

export { BlogPage };
