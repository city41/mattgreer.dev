import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type InternalLinkProps = {
	className?: string;
	href: string;
	title?: string;
	children: React.ReactNode;
};

function InternalLink({ className, href, title, children }: InternalLinkProps) {
	return (
		<Link href={href} passHref>
			<a className={clsx(className, 'text-focal')} title={title}>
				{children}
			</a>
		</Link>
	);
}

export { InternalLink };
