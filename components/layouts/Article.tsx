import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { PageHeading } from '../PageHeading';

type ArticleProps = {
	title: string;
	date: string;
	children: React.ReactNode;
};

function toId(s: string) {
	return s.toLowerCase().replace(/\s/g, '-');
}

const components = {
	h2: ({ children }) => (
		<h2 className="text-2xl font-bold mt-32" id={toId(children)}>
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="font-bold mt-16" id={toId(children)}>
			{children}
		</h3>
	),
	a: ({ children }) => (
		<a className="text-focal font-bold hover:underline">{children}</a>
	),
	img: (props) => <img className="my-12 max-w-2xl" {...props} />,
	p: ({ children }) => <p className="my-4 max-w-2xl">{children}</p>,
	pitfall: ({ children }) => (
		<div className="my-2 max-w-2xl text-red-900 bg-red-50 p-2 -mx-2">
			{children}
		</div>
	),
	wisdom: ({ children }) => (
		<div className="my-4 max-w-2xl text-green-900 bg-green-50 p-4 -mx-4">
			{children}
		</div>
	),
};

function Article({ title, date, children }: ArticleProps) {
	return (
		<MDXProvider components={components}>
			<div className="max-w-screen-lg lg:mx-auto mx-4 px-4 sm:px-16 pb-32">
				<header className="pt-24 mb-16 sm:pt-32 sm:mb-24">
					<time className="text-xs text-fg-fade" dateTime={date}>
						{new Date(date).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</time>
					<PageHeading>{title}</PageHeading>
				</header>
				{children}
			</div>
		</MDXProvider>
	);
}

export { Article };
