import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';
import { dateToHumanString } from '../../util/dates';

type ArticleProps = {
	title: string;
	metaDescription: string;
	date: string;
	intro: string;
	img: string;
	pixelateImage?: boolean;
	socialMediaImg: string;
	children: React.ReactNode;
};

function Article({
	title,
	metaDescription,
	date,
	intro,
	img,
	pixelateImage,
	socialMediaImg,
	children,
}: ArticleProps) {
	const headerContent = <p className="text-white">{intro}</p>;

	return (
		<Root
			title={title}
			metaForTitle={dateToHumanString(date)}
			metaDescription={metaDescription}
			headerContent={headerContent}
			img={img}
			pixelateImage={pixelateImage}
			socialMediaImg={socialMediaImg}
			twitterSize="small"
			imgAlt="Illustration representing the article"
			navigation
		>
			<MDXProvider components={MDXComponents}>
				<div className="mx-auto max-w-2xl sm:mt-32">{children}</div>
			</MDXProvider>
		</Root>
	);
}

export { Article };
