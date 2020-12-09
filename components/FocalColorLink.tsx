import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type FocalColorLinkProps = {
	className?: string;
	href: string;
	external?: boolean;
	target?: '_blank';
	title?: string;
	children: React.ReactNode;
};

function FocalColorLink({
	className,
	href,
	external,
	target: target,
	title,
	children,
}: FocalColorLinkProps) {
	const relProps = external ? { rel: 'noopener' } : {};

	const targetProps = target ? { target } : {};

	return (
		<Link href={href} passHref>
			<a
				className={clsx(className, 'text-focal')}
				title={title}
				{...relProps}
				{...targetProps}
				tabIndex={0}
			>
				{children}
			</a>
		</Link>
	);
}

export { FocalColorLink };
