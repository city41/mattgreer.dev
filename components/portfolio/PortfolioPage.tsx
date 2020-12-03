import React from 'react';
import { TagFilter } from './TagFilter';
import { Feature } from '../index/Feature';
import { Root } from '../layouts/Root';

type PortfolioPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function PortfolioPage({ tag, allTags, items }: PortfolioPageProps) {
	const headerContent = <TagFilter tags={allTags} currentTag={tag} />;

	return (
		<Root title="Portfolio" smallLogo headerContent={headerContent}>
			<div className="space-y-32 mb-48 max-w-6xl">
				{items.map((i) => (
					<Feature key={i.slug} {...i} side="right" />
				))}
			</div>
		</Root>
	);
}

export { PortfolioPage };
