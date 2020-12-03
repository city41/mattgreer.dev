import React from 'react';
import { Header } from './Header';
import { Feature } from './Feature';
import { InternalLink } from '../InternalLink';

type IndexPageProps = {
	items: PortfolioItem[];
};

const BlurbP = ({ children }: { children: React.ReactNode }) => {
	return <p className="my-4">{children}</p>;
};

function IndexPage({ items }: IndexPageProps) {
	return (
		<>
			<Header className="pt-12 mb-16 sm:pt-16 md:pt-32 sm:mb-32" />
			<main role="main">
				<div className="h-32 grid place-items-center font-bold">
					Some things I have created{' '}
				</div>
				<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl mx-auto">
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
			</main>
		</>
	);
}

export { IndexPage };
