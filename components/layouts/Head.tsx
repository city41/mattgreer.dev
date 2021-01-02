import NextHead from 'next/head';
import React from 'react';

type HeadProps = {
	title: string;
	metaDescription: string;
	metaImg: string;
};

function getPageTitle(incomingTitle: string): string {
	if (incomingTitle.toLowerCase().includes('greer')) {
		return incomingTitle;
	} else {
		return `${incomingTitle} | Matt Greer`;
	}
}

function Head({ title, metaDescription, metaImg }: HeadProps) {
	return (
		<NextHead>
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
		</NextHead>
	);
}

export { Head };
