import React from 'react';
import clsx from 'clsx';
import {
	FaEnvelope,
	FaGithub,
	FaLinkedin,
	FaStackOverflow,
	FaTwitter,
} from 'react-icons/fa';

type FooterProps = {
	className?: string;
};

function Footer({ className }: FooterProps) {
	return (
		<footer
			className={clsx(
				className,
				'bg-gray-300 p-8 flex flex-col items-center justify-center text-center text-sm'
			)}
		>
			<ul className="mt-4 flex flex-row space-x-6">
				<li>About Me</li>
				<li>Portfolio</li>
				<li>Resume</li>
			</ul>
			<ul className="mt-4 flex flex-row space-x-2">
				<li>
					<FaEnvelope />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaLinkedin />
				</li>
				<li>
					<FaGithub />
				</li>
				<li>
					<FaStackOverflow />
				</li>
			</ul>
		</footer>
	);
}

export { Footer };
