import React from 'react';
import { Root } from '../layouts/Root';
import { Feature } from './Feature';
import { FocalColorLink } from '../FocalColorLink';

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
				Check out my <FocalColorLink href="/about">about page</FocalColorLink>,{' '}
				<FocalColorLink href="/portfolio">portfolio</FocalColorLink>, or{' '}
				<FocalColorLink href="/MattGreer_resume.pdf">resume</FocalColorLink>.
				Or,{' '}
				<FocalColorLink href="mailto:matt.e.greer@gmail.com">
					get in touch
				</FocalColorLink>
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
					<FocalColorLink href="/portfolio">portfolio</FocalColorLink>
				</div>
			</div>
		</Root>
	);
}

export { IndexPage };
