import React from 'react';
import { Navigation } from './Navigation';
import { Head } from './Head';
import { Header } from './Header';
import { Footer } from './Footer';

type RootProps = {
	navigation?: boolean;
	title?: string;
	headTitle?: string;
	metaForTitle?: string;
	metaDescription: string;
	img: string;
	pixelateImage?: boolean;
	socialMediaImg?: string;
	imgAlt: string;
	headerContent?: React.ReactNode;
	headerContentUnderTitle?: boolean;
	children: React.ReactNode;
};

function Root({
	navigation,
	title,
	headTitle,
	metaForTitle,
	metaDescription,
	socialMediaImg,
	img,
	pixelateImage,
	imgAlt,
	headerContent,
	headerContentUnderTitle,
	children,
}: RootProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Head
				title={headTitle ?? title ?? ''}
				metaDescription={metaDescription}
				metaImg={socialMediaImg ?? img}
			/>
			{navigation && <Navigation />}
			<Header
				title={title}
				metaForTitle={metaForTitle}
				img={img}
				imgAlt={imgAlt}
				pixelateImage={pixelateImage}
				childrenUnderTitle={headerContentUnderTitle}
			>
				{headerContent}
			</Header>
			<main
				role="main"
				className="mt-12 sm:mt-24 px-8 sm:px-0 sm:max-w-6xl sm:mx-auto flex-auto"
			>
				{children}
			</main>
			<Footer className="mt-16 sm:mt-24" />
		</div>
	);
}

export { Root };
