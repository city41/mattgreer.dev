import React from 'react';
import { Root } from '../layouts/Root';
import { FiSmile } from 'react-icons/fi';
import { MDXComponents } from '../layouts/MDXComponents';

import neogeoSvg from './neogeoLogo.svg';

const { p: P, a: A, h2: H2 } = MDXComponents;

function NowPage() {
	return (
		<Root
			title="What I'm doing now"
			img={neogeoSvg.src}
			imgAlt="The Neo Geo logo"
			metaDescription="What I am currently up to"
			navigation
		>
			<div className="mx-auto max-w-2xl">
				<P>last updated Feb 26, 2024</P>
				<H2>I'm currently entrenched in the Neo Geo game console</H2>
				<p className="text-sm my-8">
					Hi, I'm Matt Greer and I am currently working with a game console from
					the 90s that has a lot of nostalgia for me, but it's also just really
					interesting
				</p>
				<ul className="list-disc flex-col space-y-8">
					<li>
						<A href="https://www.youtube.com/watch?v=WTe4LaENZgE&list=PLHpd9DwlchgPu2K79NnMZThUABkm1zSpy&pp=gAQBiAQB">
							YouTube videos
						</A>
						: they go into technical aspects of the system but also keep it
						higher level. More for entertainment than anything.{' '}
						<div className="mt-2 p-2 bg-yellow-200 text-yellow-700">
							Making videos is brand new to me, and I'm still getting the hang
							of it.{' '}
							<A href="https://www.youtube.com/watch?v=AdHPz36y-SU">
								Episode 5
							</A>{' '}
							is the first one that has decent sound quality{' '}
							<FiSmile className="inline" />
						</div>
					</li>
					<li>
						ROM hacks: changing how commercial Neo Geo games work by altering
						their binary code. Such as{' '}
						<A href="https://rotary-bobble.mattgreer.dev">Rotary Bobble</A>.
					</li>
					<li>
						Blog posts: such as my{' '}
						<A href="/blog/neo-geo-rom-hacking-guide-part-1/">
							ROM hacking guide
						</A>
					</li>
					<li>
						And a game. I am making a platformer for the Neo Geo styled after
						modern Mario games. Still early on this one, more to come.
					</li>
				</ul>
			</div>
		</Root>
	);
}

export { NowPage };
