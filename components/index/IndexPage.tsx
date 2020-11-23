import React from 'react';
import { Header } from './Header';
import { Section } from './Section';

function IndexPage() {
	return (
		<div className="flex flex-col space-y-1 max-w-screen-lg lg:mx-auto mx-4">
			<Header />
			<main role="main" className="flex flex-col sm:flex-row content-between">
				<Section className="flex-auto">
					<h1 className="text-3xl text-center">Articles</h1>
				</Section>
				<Section className="flex-auto">
					<h1 className="text-3xl text-center">Projects</h1>
				</Section>
			</main>
		</div>
	);
}

export { IndexPage };
