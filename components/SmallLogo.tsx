import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type SmallLogoProps = {
	className?: string;
};

function SmallLogo({ className }: SmallLogoProps) {
	return (
		<Link href="/" passHref>
			<a className={clsx(className, 'small_logo')} />
		</Link>
	);
}

export { SmallLogo };
