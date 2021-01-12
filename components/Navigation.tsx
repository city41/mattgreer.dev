import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import otterSvg from './otter_head.svg';

type NavigationProps = {
	className?: string;
	current?: string;
	noLogo?: boolean;
};

function NavLink({ href, children, isCurrent }) {
	return (
		<li>
			<Link href={href} passHref>
				<a className="px-1 sm:px-2 py-2 h-full grid place-items-center hover:bg-focal-alt-fade">
					{children}
				</a>
			</Link>
		</li>
	);
}

function Navigation({ className, current, noLogo }: NavigationProps) {
	const logoStyle = {
		backgroundImage: `url(${otterSvg})`,
		visibility: noLogo ? ('hidden' as const) : ('visible' as const),
	};

	return (
		<nav
			className={clsx(
				className,
				'flex flex-row pr-2 sm:pr-4 sm:-mr-4 items-stretch justify-between bg-focal-alt text-white'
			)}
		>
			<Link href="/" passHref>
				<a
					className="cursor-pointer h-14 w-14 bg-contain bg-no-repeat bg-center -mb-8 relative z-10"
					style={logoStyle}
					aria-label="home page"
					aria-hidden={noLogo}
				/>
			</Link>
			<ul className="flex flex-row space-x-1 sm:space-x-4 sm:pr-2 text-xs items-stretch border-focal-alt-fade">
				<NavLink href="/projects" isCurrent={current === '/projects'}>
					Projects
				</NavLink>
				<NavLink href="/articles" isCurrent={current === '/articles'}>
					Articles
				</NavLink>
				<NavLink href="/about" isCurrent={current === '/about'}>
					About
				</NavLink>
				<NavLink href="/hire-me" isCurrent={current === '/hire-me'}>
					Hire me
				</NavLink>
			</ul>
		</nav>
	);
}

export { Navigation };
