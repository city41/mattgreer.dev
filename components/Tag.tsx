import React from 'react';
import clsx from 'clsx';

type TagProps = {
	className?: string;
	children: TagLabel;
	component?: React.ElementType;
};

function Tag({ className, children, component = 'div' }: TagProps) {
	const Component = component;

	return (
		<Component
			className={clsx(
				className,
				'bg-focal text-white font-bold py-1 px-2 text-xs border-b-4 border-focal-deep'
			)}
		>
			{children}
		</Component>
	);
}

export { Tag };
