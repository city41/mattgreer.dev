import React from 'react';
import { LightDarkToggle } from '../LightDarkToggle';
import { Header } from '../Header';
import { Footer } from '../Footer';

type RootProps = {
	smallLogo?: boolean;
	title: string;
	headerImageClass?: string;
	headerContent: React.ReactNode;
	children: React.ReactNode;
};

function Root({
	smallLogo,
	title,
	headerImageClass,
	headerContent,
	children,
}: RootProps) {
	return (
		<>
			<LightDarkToggle className="fixed right-1 top-1 z-10" />
			<div className="mx-auto max-w-6xl pt-8 sm:pt-32">
				<Header logo={smallLogo} title={title} imageClass={headerImageClass}>
					{headerContent}
				</Header>
				<main role="main" className="mt-16">
					{children}
				</main>
			</div>
			<Footer />
		</>
	);
}

export { Root };
