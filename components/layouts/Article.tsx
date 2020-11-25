import React from 'react';
import { MDXProvider } from '@mdx-js/react';

type ArticleProps = {
	title: string;
	date: Date;
	children: React.ReactNode;
};

const components = {
	h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
	p: ({ children }) => <p className="my-2 max-w-2xl">{children}</p>,
	pitfall: ({ children }) => (
		<div className="my-2 max-w-2xl text-red-900 bg-red-50 p-2 -mx-2">
			{children}
		</div>
	),
	wisdom: ({ children }) => (
		<div className="my-2 max-w-2xl text-green-900 bg-green-50 p-2 -mx-2">
			{children}
		</div>
	),
};

function Article({ title, date, children }: ArticleProps) {
	return (
		<MDXProvider components={components}>
			<div className="max-w-screen-lg lg:mx-auto mx-4">
				<h1 className="text-4xl">{title}</h1>
				<p>written on {date.toDateString()}</p>
				{children}
			</div>
		</MDXProvider>
	);
}

export { Article };
