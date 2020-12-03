import React from 'react';
import clsx from 'clsx';
import { MDXProvider } from '@mdx-js/react';
import { Header } from '../PageHeading';
import { MDXComponents } from './MDXComponents';

type ArticleProps = {
	title: string;
	date: string;
	children: React.ReactNode;
};

function Article({ title, date, children }: ArticleProps) {
	return (
		<MDXProvider components={MDXComponents}>
			<div className="max-w-screen-lg lg:mx-auto mx-4 px-4 sm:px-16 pb-32 h-full">
				<header className="pt-24 mb-16 sm:pt-32 sm:mb-24">
					<time className="text-xs text-fg-fade" dateTime={date}>
						{new Date(date).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</time>
					<Header logo>{title}</Header>
				</header>
				{children}
			</div>
		</MDXProvider>
	);
}

export { Article };
