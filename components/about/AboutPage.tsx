import React from 'react';
import { Root } from '../layouts/Root';

function AboutPage() {
	const headerContent = (
		<>
			<p>
				My name is Matt Greer and I am based in the Ann Arbor, Michigan area.
			</p>
			<p>
				I have been a software engineer since about the year 2000. My career has
				spanned many industries and technologies, but lately I've been focused
				on web tech such as React and Svelte.
			</p>
			<p>
				I have worked for Netflix and Microsoft, amongst other companies. I am
				now an independent developer, and am interested in working with dynamic
				teams to help build out cutting edge web experiences.
			</p>
		</>
	);

	return (
		<Root title="About Me" page="about" smallLogo headerContent={headerContent}>
			<h2 className="font-bold text-2xl">My Interests</h2>
			<p>My interests go here</p>
			<h2 className="font-bold text-2xl">This Website</h2>
			<p>
				This site was built with Next.JS. It's exported out to a static site and
				hosted on GitHub pages. I used Tailwind CSS for the styling, and created
				the illustrations with Inkscape.
			</p>
		</Root>
	);
}

export { AboutPage };
