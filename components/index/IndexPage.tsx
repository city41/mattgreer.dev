import React from 'react';
import { Header } from './Header';
import { Section } from './Section';

function IndexPage() {
	return (
		<div className="flex flex-col space-y-1 max-w-screen-lg lg:mx-auto mx-4">
			<Header className="mt-8 mb-16" />
			<main
				role="main"
				className="flex flex-col sm:flex-row content-between space-x-4"
			>
				<Section className="flex-auto" title="Articles"></Section>
				<Section className="flex-auto" title="Projects"></Section>
			</main>
		</div>
	);
}

export { IndexPage };
