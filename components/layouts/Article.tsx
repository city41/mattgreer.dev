import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';

type ArticleProps = {
	title: string;
	metaDescription: string;
	date: string;
	intro: string;
	img: string;
	socialMediaImg: string;
	children: React.ReactNode;
};

function Article({
	title,
	metaDescription,
	date,
	intro,
	img,
	socialMediaImg,
	children,
}: ArticleProps) {
	const headerContent = (
		<p className="text-white">
			<time className="block mb-8 text-xs text-gray-200" dateTime={date}>
				{new Date(date).toLocaleDateString('en-us', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})}
			</time>
			{intro}
		</p>
	);

	return (
		<Root
			title={title}
			metaDescription={metaDescription}
			headerContent={headerContent}
			img={img}
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
