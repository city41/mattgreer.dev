import React from 'react';
import clsx from 'clsx';

function toId(s: string) {
	return s.toLowerCase().replace(/\s/g, '-');
}

function Callout({ className, children }) {
	return (
		<div className={clsx(className, 'my-4 max-w-2xl p-4 -mx-4')}>
			{children}
		</div>
	);
}

const MDXComponents = {
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
	img: (props) => (
		<img className="my-12 max-w-2xl" {...props} style={{ maxWidth: '100%' }} />
	),
	p: ({ children }) => <p className="my-4 max-w-2xl">{children}</p>,
	pitfall: ({ children }) => (
		<Callout className="text-red-900 bg-red-50">{children}</Callout>
	),
	wisdom: ({ children }) => (
		<Callout className="text-green-900 bg-green-50">{children}</Callout>
	),
};

export { MDXComponents };
