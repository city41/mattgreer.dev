import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
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
				'bg-bg-fade p-16 flex flex-col items-center justify-center text-center text-sm border-t border-bg-fade'
			)}
		>
			<ul className="mt-4 flex flex-row space-x-6">
				<li>About Me</li>
				<li>
					<Link href="/portfolio" passHref>
						<a>Portfolio</a>
					</Link>
				</li>
				<li>
					<Link href="/MattGreer_resume.pdf" passHref>
						<a>Resume</a>
					</Link>
				</li>
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
