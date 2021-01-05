import NextHead from 'next/head';
import React from 'react';
import fallbackImg from './meIndex_openGraph.png';

type HeadProps = {
	title: string;
	metaDescription: string;
	metaImg?: string;
	twitterSize?: 'small' | 'large';
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

	// TODO: parameterize this somewhere
	return `https://mattgreer-org.vercel.app/${url}`;
}

const SUMMARY_IMAGE_VALUE = {
	small: 'summary',
	large: 'summary_large_image',
};

function Head({
	title,
	metaDescription,
	metaImg,
	twitterSize = 'small',
}: HeadProps) {
	const finalMetaImg = `${getAbsoluteUrl(
		metaImg ?? fallbackImg
	)}?t=${title.substring(0, 10)}`;

	if (!metaImg) {
		twitterSize = 'large';
	}

	return (
		<NextHead>
			<title>{getPageTitle(title)}</title>

			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={metaDescription} />

			{/* Twitter */}
			<meta name="twitter:creator" content="@mattegreer" key="twhandle" />
			<meta name="twitter:site" content="@mattegreer" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:card" content={SUMMARY_IMAGE_VALUE[twitterSize]} />
			<meta name="twitter:image" content={finalMetaImg} />

			{/* open graph, Twitter also uses some of these */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={finalMetaImg} />
		</NextHead>
	);
}

export { Head };
