import React, { ElementType, ReactNode } from 'react';
import clsx from 'clsx';
import { FiLink } from 'react-icons/fi';
import { CodeBlock } from '../CodeBlock';

import styles from './MDXComponents.module.css';
import { FocalColorLink } from '../FocalColorLink';

function toId(s: string) {
	return s
		.toLowerCase()
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '');
}

function TextBlock({
	className,
	children,
	el,
}: {
	className?: string;
	children: ReactNode;
	el: ElementType;
}) {
	const El = el;

	return (
		<El
			className={clsx(
				className,
				styles.textBlock,
				'my-4 max-w-2xl leading-6 sm:leading-7 text-base sm:text-lg'
			)}
		>
			{children}
		</El>
	);
}

function Callout({ className, children }) {
	return (
		<TextBlock el="div" className={clsx(className, 'p-4 -mx-4 my-12')}>
			{children}
		</TextBlock>
	);
}

function HeadingSelfLink({ id }: { id: string }) {
	return (
		<a
			className={clsx(
				styles.headingSelfLink,
				'pl-1 text-fg-fade font-bold float-left -mx-8 w-8'
			)}
			aria-hidden
			href={`#${id}`}
		>
			<FiLink />
		</a>
	);
}

function Heading({ className, el, id, children }) {
	const El = el;

	return (
		<El className={clsx(className, styles.heading)} id={id}>
			{children}
			<HeadingSelfLink id={id} />
		</El>
	);
}

const MDXComponents = {
	h1: ({ children }) => {
		const id = toId(children);

		return (
			<Heading el="h1" className="text-4xl font-bold mt-16 first:mt-0" id={id}>
				{children}
			</Heading>
		);
	},
	h2: ({ children }) => {
		const id = toId(children);

		return (
			<Heading el="h2" className="text-3xl font-bold mt-16 first:mt-0" id={id}>
				{children}
			</Heading>
		);
	},
	h3: ({ children }) => {
		const id = toId(children);
		return (
			<Heading el="h3" className="text-2xl mt-12" id={id}>
				{children}
			</Heading>
		);
	},
	h4: ({ children }) => {
		const id = toId(children);
		return (
			<Heading el="h4" className="font-bold mt-12" id={id}>
				{children}
			</Heading>
		);
	},
	a: (props) => <FocalColorLink {...props} />,
	img: (props) => {
		return (
			<img
				className={clsx(styles.img, { [styles.imgPixelated]: props.pixelated })}
				{...props}
			/>
		);
	},
	p: (props) => <TextBlock el="p" {...props} />,
	pitfall: ({ children }) => (
		<Callout className="WarningBackground text-fg-warning bg-bg-warning">
			{children}
		</Callout>
	),
	wisdom: ({ children }) => (
		<Callout className="WisdomBackground text-fg-wisdom bg-bg-wisdom">
			{children}
		</Callout>
	),
	code: CodeBlock,
	pre: ({ children }) => <>{children}</>,
	ul: (props) => (
		<ul className="space-y-2 my-8 ml-4 list-disc max-w-2xl" {...props} />
	),
	ol: (props) => (
		<ul className="space-y-2 my-4 ml-4 list-decimal max-w-2xl" {...props} />
	),
	li: (props) => <li className="ml-8" {...props} />,
	blockquote: (props) => (
		<blockquote
			{...props}
			className="border-fg-fade border-l-8 pl-4 py-2 my-8"
		/>
	),
	figure: (props) => <figure className={styles.figure} {...props} />,
};

export { MDXComponents };
