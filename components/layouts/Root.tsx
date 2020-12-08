import React from 'react';
import Head from 'next/head';
import { LightDarkToggle } from '../LightDarkToggle';
import { Header } from '../Header';
import { Footer } from '../Footer';

import fallbackImg from './meIndex_openGraph.png';

type RootProps = {
	smallLogo?: boolean;
	title: string;
	metaDescription: string;
	page?: string;
	img?: string;
	headerContent: React.ReactNode;
	children: React.ReactNode;
};

function getPageTitle(incomingTitle: string): string {
	if (incomingTitle.toLowerCase().includes('greer')) {
		return incomingTitle;
	} else {
		return `${incomingTitle} | Matt Greer`;
	}
}

function Root({
	smallLogo,
	title,
	metaDescription,
	page,
	img,
	headerContent,
	children,
}: RootProps) {
	const metaImg = img ?? fallbackImg;

	return (
		<>
			<Head>
				<title>{getPageTitle(title)}</title>

				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={metaDescription} />

				{/* Twitter */}
				<meta name="twitter:creator" content="@mattegreer" key="twhandle" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:image" content={metaImg} />

				{/* open graph, Twitter also uses some of these */}
				<meta property="og:title" content={title} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:image" content={metaImg} />
			</Head>
			<LightDarkToggle className="fixed right-1 top-1 z-10" />
			<div className="mx-auto max-w-6xl pt-12 sm:pt-32">
				<Header logo={smallLogo} title={title} page={page} img={img}>
					{headerContent}
				</Header>
				<main
					role="main"
					className="mt-16 px-8 sm:px-0 sm:max-w-4xl sm:mx-auto"
				>
					{children}
				</main>
			</div>
			<Footer className="mt-16 sm:mt-24" />
		</>
	);
}

export { Root };
