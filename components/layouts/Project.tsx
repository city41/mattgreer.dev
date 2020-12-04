import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';

type ProjectProps = {
	title: string;
	img: string;
	children: React.ReactNode;
};

function Project({ title, img, children }: ProjectProps) {
	const headerContent = null;

	return (
		<Root title={title} headerContent={headerContent} img={img} smallLogo>
			<MDXProvider components={MDXComponents}>
				<div className="sm:mt-32">{children}</div>
			</MDXProvider>
		</Root>
	);
}

export { Project };
