import React from 'react';
import { TagFilter } from '../TagFilter';
import { BlogFeature } from './BlogFeature';
import { Root } from '../layouts/Root';

import laptopSvg from './laptop.svg';
import laptopPng from '../projects/laptop.png';
import { FocalColorLink } from '../FocalColorLink';

type BlogsPageProps = {
	tag?: string;
	allTags: string[];
	items: FeatureItem[];
};

function BlogPage({ tag, allTags, items }: BlogsPageProps) {
	const headerContent = (
		<>
			<p className="text-white text-sm">
				Check out <FocalColorLink href="/articles">my articles</FocalColorLink>{' '}
				for more in depth content.
			</p>
			<TagFilter
				tags={allTags}
				currentTag={tag}
				classification="blog"
				count={items.length}
			/>
		</>
	);

	return (
		<Root
			title="Blog"
			currentNav="/blog"
			metaDescription="My blog, mostly focused on game and web dev"
			img={laptopSvg}
			socialMediaImg={laptopPng}
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
