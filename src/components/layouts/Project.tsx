import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Root } from './Root';
import { MDXComponents } from './MDXComponents';

type ProjectProps = {
	title: string;
	metaDescription: string;
	img: string;
	children: React.ReactNode;
};

function Project({ title, metaDescription, img, children }: ProjectProps) {
	const headerContent = null;

	return (
		<Root
			title={title}
			metaDescription={metaDescription}
			headerContent={headerContent}
			img={img}
			imgAlt="Illustration representing the project"
			navigation
		>
			<MDXProvider components={MDXComponents}>
				<div className="sm:mt-32">{children}</div>
			</MDXProvider>
		</Root>
	);
}

export { Project };
