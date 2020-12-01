import React from 'react';
import { Header } from './Header';
import { Feature } from './Feature';
import { Footer } from './Footer';
import { InternalLink } from '../InternalLink';
import { FadeInOnScroll } from './FadeInOnScroll';

type IndexPageProps = {
	items: PortfolioItem[];
};

const BlurbP = ({ children }: { children: React.ReactNode }) => {
	return <p className="my-4">{children}</p>;
};

function IndexPage({ items }: IndexPageProps) {
	return (
		<div className="flex flex-col">
			<Header className="pt-24 mb-16 sm:pt-32 sm:mb-32" />
			<main role="main">
				<div className="h-32 grid place-items-center font-bold">
					Some things I have created{' '}
				</div>
				<div className="flex flex-col space-y-48 overflow-x-hidden">
					{items.map((item, index) => {
						return (
							<FadeInOnScroll
								key={item.slug}
								comeFrom={index & 1 ? 'right' : 'left'}
							>
								<Feature
									side={index & 1 ? 'left' : 'right'}
									slug={item.slug}
									title={item.title}
									description={item.description}
									classification={item.classification}
									type={item.type}
									tags={item.tags}
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
