import React from 'react';
import clsx from 'clsx';
import {
	FaEnvelope,
	FaGithub,
	FaLinkedin,
	FaStackOverflow,
	FaTwitter,
} from 'react-icons/fa';

type HeaderProps = {
	className?: string;
};

function Header({ className }: HeaderProps) {
	return (
		<header className={clsx(className, 'grid grid-cols-8 grid-rows-2 gap-4')}>
			<div className="bg-blue-50 col-span-2 sm:row-span-2">logo</div>
			<h1 className="text-5xl col-span-6 sm:col-span-3">Matt Greer</h1>
			<div className="flex flex-row col-span-8 sm:col-span-3 justify-end items-center space-x-2">
				<FaEnvelope />
				<FaTwitter />
				<FaGithub />
				<FaLinkedin />
				<FaStackOverflow />
			</div>
			<div className="col-span-8 sm:col-span-6">
				hello its me. this needs more text to take up more space while I figure
				all this crap out
			</div>
		</header>
	);
}

export { Header };
