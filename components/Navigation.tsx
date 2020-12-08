import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ResumeLink } from './ResumeLink';

import styles from './Navigation.module.css';

type NavigationProps = {
	className?: string;
	current?: string;
};

function NavLink({ href, children, isCurrent }) {
	return (
		<li style={{ marginBottom: -2 }}>
			<Link href={href} passHref>
				<a
					className={clsx(
						'border-b-2 px-1 sm:px-2 h-full grid place-items-center',
						{
							'text-fg-fade border-transparent hover:bg-bg-fade': !isCurrent,
							'text-focal border-focal': isCurrent,
						}
					)}
				>
					{children}
				</a>
			</Link>
		</li>
	);
}

function Navigation({ className, current }: NavigationProps) {
	return (
		<nav
			className={clsx(
				className,
				'flex flex-row px-2 sm:px-4 items-stretch justify-between border-bg-fade border-b'
			)}
		>
			<Link href="/" passHref>
				<div className="flex flex-row w-auto cursor-pointer">
					<a className={clsx(styles.smallLogo, 'h-full w-6 sm:w-9')} />
					<div className="self-stretch text-xs text-fg-fade ml-1 hover:bg-bg-fade grid place-items-center px-1 py-3 sm:px-2">
						Matt Greer
					</div>
				</div>
			</Link>
			<ul className="flex flex-row space-x-1 sm:space-x-4 text-xs items-stretch">
				<NavLink href="/projects" isCurrent={current === '/projects'}>
					Projects
				</NavLink>
				<NavLink href="/articles" isCurrent={current === '/articles'}>
					Articles
				</NavLink>
				<NavLink href="/about" isCurrent={current === '/about'}>
					About
				</NavLink>
				<NavLink href="/MattGreer_resume.pdf" isCurrent={false}>
					Resume
				</NavLink>
			</ul>
		</nav>
	);
}

export { Navigation };
