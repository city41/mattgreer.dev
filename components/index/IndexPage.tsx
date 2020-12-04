import React from 'react';
import { Root } from '../layouts/Root';
import { Feature } from './Feature';
import { InternalLink } from '../InternalLink';

type IndexPageProps = {
	items: PortfolioItem[];
};

function IndexPage({ items }: IndexPageProps) {
	const headerContent = (
		<>
			<p>
				Hi! I am a freelance software engineer with a focus on web technologies.
				This website is a collection of projects I have created and articles I
				have written.
			</p>
			<p>
				Check out my <InternalLink href="/about">about page</InternalLink>,{' '}
				<InternalLink href="/portfolio">portfolio</InternalLink>, or{' '}
				<InternalLink href="/MattGreer_resume.pdf">resume</InternalLink>. Or,{' '}
				<InternalLink href="mailto:matt.e.greer@gmail.com">
					get in touch
				</InternalLink>
				.
			</p>
		</>
	);

	return (
		<Root
			smallLogo={false}
			title="Matt Greer"
			page="index"
			headerContent={headerContent}
		>
			<div className="h-32 grid place-items-center font-bold">
				Some things I have created{' '}
			</div>
			<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl -mx-8 sm:mx-auto">
				{items.map((item, index) => {
					return (
						<Feature
							key={item.slug}
							side={index & 1 ? 'left' : 'right'}
							slug={item.slug}
							title={item.title}
							description={item.description}
							classification={item.classification}
							type={item.type}
							tags={item.tags}
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
		</Root>
	);
}

export { IndexPage };
