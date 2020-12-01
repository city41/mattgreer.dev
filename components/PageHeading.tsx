import React from 'react';
import clsx from 'clsx';

type PageHeadingProps = {
	className?: string;
	children: React.ReactNode;
};

function PageHeading({ className, children }: PageHeadingProps) {
	return (
		<h1
			className={clsx(
				className,
				'text-7xl text-center sm:text-left font-black text-focal'
			)}
		>
			{children}
		</h1>
	);
}

export { PageHeading };
