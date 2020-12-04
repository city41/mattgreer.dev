import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';

type ArticleProps = {
	title: string;
	date: string;
	intro: string;
	img: string;
	children: React.ReactNode;
};

function Article({ title, date, intro, img, children }: ArticleProps) {
	const headerContent = (
		<p>
			<time className="block mb-8 text-xs text-fg-fade" dateTime={date}>
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
		<Root title={title} headerContent={headerContent} img={img} smallLogo>
			<MDXProvider components={MDXComponents}>
				<div className="sm:mt-32">{children}</div>
			</MDXProvider>
		</Root>
	);
}

export { Article };
