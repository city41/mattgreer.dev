import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type TagProps = {
	className?: string;
	children: TagLabel;
	component?: React.ElementType;
};

function getUrl(tag: TagLabel) {
	if (tag === 'All') {
		return '/portfolio';
	} else {
		return `/portfolio/${tag}`;
	}
}

function Tag({ className, children, component = 'div' }: TagProps) {
	const Component = component;

	return (
		<Link href={getUrl(children)} passHref>
			<a>
				<Component
					className={clsx(
						className,
						'bg-focal-alt text-white font-bold py-1 px-2 sm:text-xs hover:underline hover:bg-focal-fade hover:text-white'
					)}
				>
					{children}
				</Component>
			</a>
		</Link>
	);
}

export { Tag };
