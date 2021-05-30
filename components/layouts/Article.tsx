import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';
import { dateToHumanString } from '../../util/dates';

type ArticleProps = {
	title: string;
	description: string;
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
	description,
	metaDescription,
	date,
	intro,
	img,
	pixelateImage,
	socialMediaImg,
	children,
}: ArticleProps) {
	const headerContent = (
		<p className="text-white sm:mx-auto sm:max-w-2xl">{intro}</p>
	);

	return (
		<Root
			title={title}
			metaForTitle={dateToHumanString(date)}
			metaDescription={metaDescription || description}
			headerContent={headerContent}
			img={img}
			pixelateImage={pixelateImage}
			socialMediaImg={socialMediaImg}
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
