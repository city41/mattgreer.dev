import React from 'react';
import { TagFilter } from '../TagFilter';
import { Feature } from '../Feature';
import { Root } from '../layouts/Root';

type ArticlesPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function ArticlesPage({ tag, allTags, items }: ArticlesPageProps) {
	const headerContent = (
		<TagFilter tags={allTags} currentTag={tag} classification="articles" />
	);

	return (
		<Root
			title="Articles"
			metaDescription="Technical articles I have written, mostly related to web tech"
			page="articles"
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

export { ArticlesPage };
