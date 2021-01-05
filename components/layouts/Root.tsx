import React from 'react';
import { Navigation } from '../Navigation';
import { Head } from './Head';
import { Header } from '../Header';
import { Footer } from '../Footer';

type RootProps = {
	navigation?: boolean;
	currentNav?: string;
	title: string;
	metaForTitle?: string;
	metaDescription: string;
	img: string;
	pixelateImage?: boolean;
	socialMediaImg?: string;
	twitterSize?: 'small' | 'large';
	imgAlt: string;
	headerContent?: React.ReactNode;
	headerContentUnderTitle?: boolean;
	children: React.ReactNode;
};

function Root({
	navigation,
	currentNav,
	title,
	metaForTitle,
	metaDescription,
	socialMediaImg,
	twitterSize,
	img,
	pixelateImage,
	imgAlt,
	headerContent,
	headerContentUnderTitle,
	children,
}: RootProps) {
	return (
		<>
			<Head
				title={title}
				metaDescription={metaDescription}
				metaImg={socialMediaImg ?? img}
				twitterSize={twitterSize}
			/>
			{navigation && <Navigation current={currentNav} />}
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
			<main role="main" className="mt-32 px-8 sm:px-0 sm:max-w-6xl sm:mx-auto">
				{children}
			</main>
			<Footer className="mt-16 sm:mt-24" />
		</>
	);
}

export { Root };
