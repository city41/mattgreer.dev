import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Header } from '../PageHeading';
import { MDXComponents } from './MDXComponents';

type ProjectProps = {
	title: string;
	children: React.ReactNode;
};

function Project({ title, children }: ProjectProps) {
	return (
		<MDXProvider components={MDXComponents}>
			<div className="max-w-screen-lg lg:mx-auto mx-4 px-4 sm:px-16 pb-32 h-full">
				<header className="pt-24 mb-16 sm:pt-32 sm:mb-24">
					<Header logo>{title}</Header>
				</header>
				{children}
			</div>
		</MDXProvider>
	);
}

export { Project };
