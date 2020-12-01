import React from 'react';
import clsx from 'clsx';

import { PageHeading } from '../PageHeading';
import { InternalLink } from '../InternalLink';
import sketchPng from './sketch.png';

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
			<div className="bg-blue-50 col-start-4 col-end-7 row-span-2 sm:row-start-1 sm:col-start-2 sm:col-end-4 self-center">
				<img src={sketchPng} alt="sketch of me" />
			</div>
			<PageHeading className="col-span-8 sm:row-start-1 sm:col-start-4 sm:col-span-4">
				Matt Greer
			</PageHeading>
			<div className="col-start-2 col-span-6 sm:row-start-2 sm:col-start-4 sm:col-end-8 text-2xl space-y-8">
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
