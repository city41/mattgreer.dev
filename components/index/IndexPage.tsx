import React from 'react';
import { Header } from './Header';
import { Section } from './Section';

const articleSlugs = ['sega-saturn-and-transparency'];

const articles = articleSlugs.map((slug) => {
	const mdx = require(`../../pages/articles/${slug}/index.mdx`);
	return {
		...mdx,
		url: `/articles/${slug}/`,
	};
});

function IndexPage() {
	return (
		<div className="flex flex-col space-y-1 max-w-screen-lg lg:mx-auto mx-4">
			<Header className="mt-8 mb-16" />
			<main
				role="main"
				className="flex flex-col sm:flex-row content-between space-x-4"
			>
				<Section className="flex-auto" title="Articles" entries={articles} />
				<Section className="flex-auto" title="Projects" entries={[]} />
			</main>
		</div>
	);
}

export { IndexPage };
