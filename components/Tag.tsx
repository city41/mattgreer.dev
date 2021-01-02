import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type TagProps = {
	className?: string;
	children: TagLabel;
	component?: React.ElementType;
	classification: 'projects' | 'articles';
};

function getUrl(classification: TagProps['classification'], tag: TagLabel) {
	if (tag === 'All') {
		return `/${classification}`;
	} else {
		return `/${classification}/${tag}`;
	}
}

function Tag({
	className,
	children,
	component = 'div',
	classification,
}: TagProps) {
	const Component = component;

	return (
		<Link href={getUrl(classification, children)} passHref>
			<a>
				<Component
					className={clsx(
						className,
						'font-bold py-1 px-2 sm:text-xs hover:underline hover:bg-focal-alt-fade hover:text-white'
					)}
				>
					{children}
				</Component>
			</a>
		</Link>
	);
}

export { Tag };
