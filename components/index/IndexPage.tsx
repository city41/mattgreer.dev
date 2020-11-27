import React from 'react';
import { Header } from './Header';
import { Feature } from './Feature';
import { Footer } from './Footer';

// const articleSlugs = ['sega-saturn-and-transparency'];
//
// const articles = articleSlugs.map((slug) => {
// 	const mdx = require(`../../pages/articles/${slug}/index.mdx`);
// 	return {
// 		...mdx,
// 		url: `/articles/${slug}/`,
// 	};
// });

function IndexPage() {
	return (
		<div className="flex flex-col">
			<Header className="mt-24 mb-16 sm:mt-32" />
			<main role="main">
				<div className="h-32 grid place-items-center font-bold">
					Some things I have created{' '}
				</div>
				<div className="flex flex-col space-y-48">
					<Feature side="right" title="Jump.Club" type="website" />
					<Feature
						side="left"
						title="JavaScript Promises"
						type="technical article"
					/>
					<Feature
						side="right"
						title="The Sega Saturn and Transparency"
						type="interactive article"
					/>
				</div>
				<div className="h-32 grid place-items-center font-bold">
					<div>
						Many more things in my <a className="text-focal">portfolio</a>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export { IndexPage };
