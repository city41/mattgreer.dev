import React from 'react';
import clsx from 'clsx';
import { SmallLogo } from './SmallLogo';

type PageHeadingProps = {
	className?: string;
	logo?: boolean;
	children: React.ReactNode;
};

function PageHeading({ className, logo, children }: PageHeadingProps) {
	return (
		<>
			{logo && <SmallLogo className="absolute left-2 top-2 mx-auto mb-4" />}
			<h1
				className={clsx(
					className,
					'text-5xl sm:text-7xl font-black text-focal'
				)}
			>
				{children}
			</h1>
		</>
	);
}

export { PageHeading };
