import React from 'react';
import clsx from 'clsx';

type HeaderProps = {
	className?: string;
};

function Header({ className }: HeaderProps) {
	return (
		<header
			className={clsx(
				className,
				'grid grid-cols-8 gap-y-8 sm:gap-x-4 auto-rows-min'
			)}
		>
			<div className="bg-blue-50 col-start-4 col-end-6 h-20 sm:h-auto sm:row-start-1 sm:col-start-3 sm:col-end-4">
				logo
			</div>
			<h1 className="text-7xl col-span-8 text-center font-black sm:text-left sm:row-start-1 sm:col-start-4">
				Matt Greer
			</h1>
			<div className="col-start-2 col-span-6 sm:row-start-2 sm:col-start-4 sm:col-end-7">
				Hi! I am a freelance software engineer with a focus on web technologies.
				Want to learn more? Check out my{' '}
				<a className="text-blue-500">about page</a>,{' '}
				<a className="text-blue-500">my resume</a>, or{' '}
				<a className="text-blue-500">get in touch</a>.
			</div>
		</header>
	);
}

export { Header };
