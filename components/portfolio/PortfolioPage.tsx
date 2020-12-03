import React from 'react';
import { PageHeading } from '../PageHeading';
import { TagFilter } from './TagFilter';
import { Feature } from '../index/Feature';
import { Footer } from '../index/Footer';

type PortfolioPageProps = {
	tag?: TagLabel;
	allTags: TagLabel[];
	items: PortfolioItem[];
};

function PortfolioPage({ tag, allTags, items }: PortfolioPageProps) {
	return (
		<>
			<div className="mx-auto flex flex-col max-w-6xl">
				<header className="pt-24 px-8 mb-16 sm:pt-32 sm:mb-32">
					<PageHeading className="text-center sm:text-left" logo>
						My Portfolio
					</PageHeading>
					<TagFilter className="mt-16" tags={allTags} currentTag={tag} />
				</header>
				<main className="space-y-32 mb-48 max-w-6xl">
					{items.map((i) => (
						<Feature key={i.slug} {...i} side="right" />
					))}
				</main>
			</div>
		</>
	);
}

export { PortfolioPage };
