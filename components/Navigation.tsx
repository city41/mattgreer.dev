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
		<li>
			<Link href={href} passHref>
				<a
					className={clsx(
						'border-b-2 px-1 sm:px-2 h-full grid place-items-center',
						{
							'border-transparent hover:bg-focal-alt-fade': !isCurrent,
							'border-white': isCurrent,
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
				'flex flex-row px-2 sm:-mr-4 sm:px-4 items-stretch justify-between bg-focal-alt text-white border-focal-alt-fade border-b-2 sm:border-b-0'
			)}
		>
			<Link href="/" passHref>
				<a className="flex flex-row w-auto cursor-pointer hover:bg-focal-alt pl-4 -ml-4">
					<div className={clsx(styles.smallLogo, 'h-full w-6 sm:w-9')} />
					<div className="self-stretch text-xs ml-1 h-full grid place-items-center px-1 py-3 sm:px-2">
						Matt Greer
					</div>
				</a>
			</Link>
			<ul className="flex flex-row space-x-1 sm:space-x-4 sm:pr-2 text-xs items-stretch sm:border-focal-alt-fade sm:border-b-2">
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
