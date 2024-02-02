import React from 'react';
import { Root } from '../layouts/Root';
import { FiSmile } from 'react-icons/fi';
import { MDXComponents } from '../layouts/MDXComponents';
import { FocalColorLink } from '../FocalColorLink';
import { ResumeLink } from '../ResumeLink';

import baguettesJpg from './baguettes.jpg';
import frannyJpg from './franny.jpg';
import charlieJpg from './charlie.jpg';
import ddrJpg from './ddr.jpg';

import michiganSvg from './michigan.svg';
import michiganPng from './michigan.png';

const { h2: H2, p: P, img: Img } = MDXComponents;

function AboutPage() {
	return (
		<Root
			title="About Me"
			img={michiganSvg}
			socialMediaImg={michiganPng.src}
			imgAlt="Illustration of the state of Michigan"
			metaDescription="Some background about me and this website"
			navigation
		>
			<div className="mx-auto max-w-2xl">
				<P>My name is Matt Greer and I am based in Michigan</P>
				<P>
					I have been a professional software engineer since 2004, but started
					programming as a small child. My career has spanned many industries
					and technologies, but lately I've focused on web tech such as React,
					Web Assembly and Svelte.
				</P>
				<P>
					I have worked for Netflix and Microsoft, amongst other companies (here
					is my <ResumeLink />
					).
				</P>
				<H2>My Interests</H2>
				<P>
					As you can probably tell by many of my{' '}
					<FocalColorLink href="/projects">projects</FocalColorLink>, I really
					like old video games. I especially find old game console hardware
					interesting. It's super neat how they were custom built for running
					games, almost as if they have a game engine built into the hardware
					itself.
				</P>
				<P>
					Recently I have been exploring baking bread and pizza. Here is a
					recent baguette I made, and well, I have a long ways to go{' '}
					<FiSmile className="inline" />. It's pretty interesting just how far
					down the rabbit hole you can go on flour, hydration, fermentation and
					more. And eating delicious bread regularly is okay by me.
					<Img
						src={baguettesJpg}
						alt="a baguette I made"
						width={800}
						height={600}
					/>
				</P>
				<P>
					I'm a big softy when it comes to animals. Here is our blind dog
					Franny,
					<Img src={frannyJpg} alt="Franny, my dog" width={800} height={600} />
				</P>
				<P>
					and our cat Charlie.
					<Img
						src={charlieJpg}
						alt="Charlie, my cat"
						width={800}
						height={600}
					/>
				</P>
				<P>
					I also really enjoy the game Dance Dance Revolution. This is a video
					game where you physically "dance" on a platform in time with the
					game's prompts. It's a great workout! I've recently acquired an
					amazing home setup which is just about on par with what you'd find in
					an arcade.
					<Img src={ddrJpg} alt="My DDR setup" width={800} height={600} />
				</P>
				<P>
					I enjoy the game so much I created{' '}
					<FocalColorLink href="https://ddr.stepcharts.com" external>
						Stepcharts.com
					</FocalColorLink>{' '}
					to help people find interesting songs they didn't know about.
				</P>

				<H2>This Website</H2>
				<P>
					This site was built with Next.JS and hosted by Vercel. I used Tailwind
					CSS for the styling, and created the illustrations with Inkscape. You
					can see its{' '}
					<FocalColorLink
						href="https://github.com/city41/mattgreer.org"
						external
					>
						source code here
					</FocalColorLink>
					.
				</P>
			</div>
		</Root>
	);
}

export { AboutPage };
