import React from 'react';
import Head from 'next/head';
import { LightDarkToggle } from '../LightDarkToggle';
import { Navigation } from '../Navigation';
import { Header } from '../Header';
import { Footer } from '../Footer';

import fallbackImg from './meIndex_openGraph.png';

type RootProps = {
	navigation?: boolean;
	currentNav?: string;
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

function getAbsoluteUrl(url: string): string {
	if (url.startsWith('http')) {
		return url;
	}

	if (url.startsWith('/')) {
		url = url.substring(1);
	}

	return `https://mattgreer-org.vercel.app/${url}`;
}

function Root({
	navigation,
	currentNav,
	title,
	metaDescription,
	page,
	img,
	headerContent,
	children,
}: RootProps) {
	const metaImg = `${getAbsoluteUrl(img ?? fallbackImg)}?t=${title.substring(
		0,
		10
	)}`;

	return (
		<>
			<Head>
				<title>{getPageTitle(title)}</title>

				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={metaDescription} />

				{/* Twitter */}
				<meta name="twitter:creator" content="@mattegreer" key="twhandle" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={metaImg} />

				{/* open graph, Twitter also uses some of these */}
				<meta property="og:title" content={title} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:image" content={metaImg} />
			</Head>
			{navigation && <Navigation current={currentNav} />}
			<div className="mx-auto max-w-6xl">
				<Header className="mt-16" title={title} page={page} img={img}>
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
