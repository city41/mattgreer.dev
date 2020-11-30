import React from 'react';
import { Header } from './Header';
import { Feature } from './Feature';
import { Footer } from './Footer';
import { InternalLink } from '../InternalLink';
import { FadeInOnScroll } from './FadeInOnScroll';

import jumpClubPng from './jumpclub.png';
import webstormJpg from './webstorm.jpg';
import saturnPng from './saturn.png';

const BlurbP = ({ children }: { children: React.ReactNode }) => {
	return <p className="my-4">{children}</p>;
};

const features = [
	{
		slug: 'projects/jump-club',
		blurb: (
			<>
				<BlurbP>
					A web based game creator inspired by Nintendo's Mario Maker.
				</BlurbP>
				<BlurbP>
					Players can create their own levels using a very intuitive level
					editor. Once a level is published, it's easily shared with others with
					a url.
				</BlurbP>
			</>
		),
		tags: ['React', 'TypeScript', 'Redux', 'NodeJS', 'Godot', 'wasm'],
		img: jumpClubPng,
	},
	{
		slug: 'articles/promises-in-wicked-detail',
		blurb: (
			<>
				<BlurbP>
					A detailed article that implements a simple Promise type from scratch.
				</BlurbP>
				<BlurbP>
					By building the Promise implementation gradually, it shows the why and
					how of Promises.
				</BlurbP>
			</>
		),
		tags: ['JavaScript'],
		img: webstormJpg,
	},
	{
		slug: 'articles/sega-saturn-and-transparency',
		blurb: (
			<>
				<BlurbP>
					The Saturn's complex hardware architecture meant having
					semi-transparent entities in a game was challenging.
				</BlurbP>
				<BlurbP>
					This interactive article explains the conundrum, and shows why game
					developers often settled for inferior alternatives.
				</BlurbP>
			</>
		),
		tags: ['React', 'TypeScript'],
		img: saturnPng,
	},
] as const;

function IndexPage() {
	return (
		<div className="flex flex-col">
			<Header className="mt-24 mb-16 sm:mt-32 sm:mb-32" />
			<main role="main">
				<div className="h-32 grid place-items-center font-bold">
					Some things I have created{' '}
				</div>
				<div className="flex flex-col space-y-48 overflow-x-hidden">
					{features.map((feature, index) => {
						const mdx = require(`../../pages/${feature.slug}/index.mdx`);
						return (
							<FadeInOnScroll
								key={feature.slug}
								comeFrom={index & 1 ? 'right' : 'left'}
							>
								<Feature
									side={index & 1 ? 'left' : 'right'}
									slug={feature.slug}
									title={mdx.title}
									blurb={feature.blurb}
									type={mdx.type}
									tags={feature.tags}
									img={feature.img}
								/>
							</FadeInOnScroll>
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
