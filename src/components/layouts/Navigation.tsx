import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './Navigation.module.css';

import otterSvg from './otter_head.svg';

type NavigationProps = {
	className?: string;
};

function NavLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<li>
			<Link href={href} passHref legacyBehavior>
				<a className="px-1 sm:px-2 py-2 h-full grid place-items-center hover:bg-focal-fade hover:text-white">
					{children}
				</a>
			</Link>
		</li>
	);
}

function Navigation({ className }: NavigationProps) {
	const logoStyle = {
		backgroundImage: `url(${otterSvg.src})`,
		width: 32,
		height: 32,
	};

	return (
		<nav
			className={clsx(
				styles.root,
				className,
				'relative w-full flex flex-row items-center justify-center sm:justify-end bg-bg-fade text-fg'
			)}
		>
			<ul className="flex flex-row space-x-1 sm:space-x-4 text-xs">
				<NavLink href="/projects">Projects</NavLink>
				<NavLink href="/articles">Articles</NavLink>
				<NavLink href="/blog">Blog</NavLink>
				<NavLink href="/about">About</NavLink>
				<NavLink href="/now">Now</NavLink>
			</ul>
			<Link href="/" passHref legacyBehavior>
				<a
					className="cursor-pointer block bg-cover absolute sm:static right-0 top-0 sm:ml-4"
					style={logoStyle}
					aria-label="home page"
				/>
			</Link>
		</nav>
	);
}

export { Navigation };
