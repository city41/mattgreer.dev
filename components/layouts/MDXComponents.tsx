import React, { ElementType, ReactNode } from 'react';
import clsx from 'clsx';

function toId(s: string) {
	return s.toLowerCase().replace(/\s/g, '-');
}

function TextBlock({
	className,
	children,
	el,
}: {
	className: string;
	children: ReactNode;
	el: ElementType;
}) {
	const El = el;

	return (
		<El
			className={clsx(
				className,
				'my-4 max-w-xl leading-6 sm:leading-7 text-base sm:text-lg'
			)}
		>
			{children}
		</El>
	);
}

function Callout({ className, children }) {
	return (
		<TextBlock el="div" className={clsx(className, 'p-4 -mx-4')}>
			{children}
		</TextBlock>
	);
}

const MDXComponents = {
	h2: ({ children }) => (
		<h2 className="text-3xl font-bold mt-16" id={toId(children)}>
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-2xl mt-12" id={toId(children)}>
			{children}
		</h3>
	),
	a: ({ children }) => (
		<a className="text-focal font-bold underline cursor-pointer" tabIndex={0}>
			{children}
		</a>
	),
	img: (props) => (
		<img className="my-12 max-w-2xl" {...props} style={{ maxWidth: '100%' }} />
	),
	p: ({ children }) => <TextBlock el="p">{children}</TextBlock>,
	pitfall: ({ children }) => (
		<Callout className="text-red-900 bg-red-50">{children}</Callout>
	),
	wisdom: ({ children }) => (
		<Callout className="text-green-900 bg-green-50">{children}</Callout>
	),
};

export { MDXComponents };
