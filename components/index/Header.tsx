import React from 'react';
import clsx from 'clsx';

import { PageHeading } from '../PageHeading';
import { InternalLink } from '../InternalLink';

type HeaderProps = {
	className?: string;
};

function Header({ className }: HeaderProps) {
	return (
		<header
			className={clsx(
				className,
				'grid grid-cols-8 gap-8 auto-rows-min max-w-screen-lg mx-auto'
			)}
		>
			<div
				className={clsx(
					'index_page_header_illustration col-start-2 col-end-8 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch'
				)}
			/>
			<PageHeading className="col-start-2 col-end-8 sm:row-start-1 sm:col-start-4 sm:col-end-9">
				Matt Greer
			</PageHeading>
			<div className="col-start-2 col-span-6 sm:row-start-2 sm:col-start-4 sm:col-end-8 sm:text-2xl space-y-8">
				<p>
					Hi! I am a freelance software engineer with a focus on web
					technologies. This website is a collection of projects I have created
					and articles I have written.
				</p>
				<p>
					Check out my <InternalLink href="/about">about page</InternalLink>,{' '}
					<InternalLink href="/portfolio">portfolio</InternalLink>, or{' '}
					<InternalLink href="/MattGreer_resume.pdf">resume</InternalLink>. Or,{' '}
					<InternalLink href="/contact">get in touch</InternalLink>.
				</p>
			</div>
		</header>
	);
}

export { Header };
