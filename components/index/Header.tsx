import React from 'react';
import clsx from 'clsx';

type HeaderProps = {
	className?: string;
};

function Header({ className }: HeaderProps) {
	return (
		<header className={clsx(className, 'grid grid-cols-8 gap-8 auto-rows-min')}>
			<div className="bg-blue-50 col-start-4 col-end-7 h-64 row-span-2 sm:row-start-1 sm:col-start-2 sm:col-end-4 self-center">
				illustration
			</div>
			<h1
				className="xtext-7xl col-span-8 text-center font-black text-focal sm:text-left sm:row-start-1 sm:col-start-4 sm:col-span-4"
				style={{ fontSize: '7vw' }}
			>
				Matt Greer
			</h1>
			<div className="col-start-2 col-span-6 sm:row-start-2 sm:col-start-4 sm:col-end-8 text-2xl space-y-8">
				<p>
					Hi! I am a freelance software engineer with a focus on web
					technologies. This website is a collection of projects I have created
					and articles I have written.
				</p>
				<p>
					Want to learn more? Check out my{' '}
					<a className="text-focal">about page</a>,{' '}
					<a className="text-focal">my resume</a>, or{' '}
					<a className="text-focal">get in touch</a>.
				</p>
			</div>
		</header>
	);
}

export { Header };
