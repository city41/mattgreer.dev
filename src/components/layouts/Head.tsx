import NextHead from 'next/head';
import React from 'react';
import getConfig from 'next/config';
import fallbackImg from './meIndex_openGraph.png';

type HeadProps = {
	title: string;
	metaDescription: string;
	metaRevised?: string;
	metaImg?: string;
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

	const domain = getConfig().serverRuntimeConfig.ROOT_DOMAIN;

	return `https://${domain}/${url}`;
}

function Head({ title, metaDescription, metaRevised, metaImg }: HeadProps) {
	const finalMetaImg = `${getAbsoluteUrl(
		metaImg ?? fallbackImg.src
	)}?t=${title.substring(0, 10)}`;

	const metaRevisedTag = metaRevised ? (
		<meta name="revised" content={metaRevised} />
	) : null;

	return (
		<NextHead>
			<title>{getPageTitle(title)}</title>

			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={metaDescription} />
			{metaRevisedTag}

			{/* Twitter */}
			<meta name="twitter:creator" content="mattgreer.dev" />
			<meta name="twitter:site" content="mattgreer.dev" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={finalMetaImg} />

			{/* open graph, Twitter also uses some of these */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={finalMetaImg} />
		</NextHead>
	);
}

export { Head };
