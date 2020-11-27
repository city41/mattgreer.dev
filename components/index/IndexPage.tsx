import React from 'react';
import { Header } from './Header';
import { Feature } from './Feature';
import { Footer } from './Footer';
import { InternalLink } from '../InternalLink';

// const articleSlugs = ['sega-saturn-and-transparency'];
//
// const articles = articleSlugs.map((slug) => {
// 	const mdx = require(`../../pages/articles/${slug}/index.mdx`);
// 	return {
// 		...mdx,
// 		url: `/articles/${slug}/`,
// 	};
// });

const features = [
	{
		slug: 'projects/jump-club',
		blurb: (
			<>
				<p>jump club blurb</p>
			</>
		),
		tags: ['React', 'TypeScript', 'Redux', 'NodeJS'],
	},
	{
		slug: 'articles/promises-in-wicked-detail',
		blurb: (
			<>
				<p>promises blurb</p>
			</>
		),
		tags: ['JavaScript'],
	},
	{
		slug: 'articles/sega-saturn-and-transparency',
		blurb: (
			<>
				<p>saturn blurb</p>
			</>
		),
		tags: ['React', 'TypeScript'],
	},
];

function IndexPage() {
	return (
		<div className="flex flex-col">
			<Header className="mt-24 mb-16 sm:mt-32 sm:mb-32" />
			<main role="main">
				<div className="h-32 grid place-items-center font-bold">
					Some things I have created{' '}
				</div>
				<div className="flex flex-col space-y-48">
					{features.map((feature, index) => {
						const mdx = require(`../../pages/${feature.slug}/index.mdx`);
						return (
							<Feature
								key={feature.slug}
								side={index & 1 ? 'left' : 'right'}
								slug={feature.slug}
								title={mdx.title}
								blurb={feature.blurb}
								type={mdx.type}
								tags={feature.tags}
							/>
						);
					})}
				</div>
				<div className="h-48 grid place-items-center font-bold">
					<div>
						Much more in my{' '}
						<InternalLink href="/portfolio">portfolio</InternalLink>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export { IndexPage };
