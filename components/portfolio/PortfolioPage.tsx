import React from 'react';
import { PageHeading } from '../PageHeading';
import { TagFilter } from './TagFilter';
import { Item } from './Item';
import { Footer } from '../index/Footer';

type PortfolioPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function PortfolioPage({ tag, allTags, items }: PortfolioPageProps) {
	return (
		<>
			<div className="mx-auto flex flex-col max-w-xl">
				<header className="pt-24 mb-16 sm:pt-32 sm:mb-32">
					<PageHeading>My Portfolio</PageHeading>
					<TagFilter className="mt-16" tags={allTags} currentTag={tag} />
				</header>
				<main className="space-y-32 mx-auto mb-48">
					{items.map((i) => (
						<Item key={i.slug} {...i} />
					))}
				</main>
			</div>
			<Footer />
		</>
	);
}

export { PortfolioPage };
