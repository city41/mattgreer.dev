import React from 'react';
import clsx from 'clsx';

type HeaderProps = {
	className?: string;
};

function Header({ className }: HeaderProps) {
	return (
		<header
			className={clsx(className, 'grid grid-cols-8 grid-rows-2 gap-2 my-8')}
		>
			<div className="bg-blue-50 col-span-2 sm:row-span-2">logo</div>
			<h1 className="text-5xl col-span-6 sm:col-span-3">Matt Greer</h1>
			<div className="flex flex-row col-span-8 sm:col-span-3 justify-between items-center">
				<div>email</div>
				<div>twitter</div>
				<div>github</div>
				<div>stack</div>
				<div>linkedin</div>
				<div>resume</div>
			</div>
			<div className="col-span-8 sm:col-span-6">
				hello its me. this needs more text to take up more space while I figure
				all this crap out
			</div>
		</header>
	);
}

export { Header };
