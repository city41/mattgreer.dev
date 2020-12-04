import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type FocalColorLinkProps = {
	className?: string;
	href: string;
	external?: boolean;
	title?: string;
	children: React.ReactNode;
};

function FocalColorLink({
	className,
	href,
	external,
	title,
	children,
}: FocalColorLinkProps) {
	const relProps = external ? { rel: 'noopener' } : {};

	return (
		<Link href={href} passHref>
			<a className={clsx(className, 'text-focal')} title={title} {...relProps}>
				{children}
			</a>
		</Link>
	);
}

export { FocalColorLink };
