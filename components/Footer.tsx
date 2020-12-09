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
import { LightDarkToggle } from './LightDarkToggle';

type FooterProps = {
	className?: string;
};

function IconLink({
	Icon,
	href,
	label,
}: {
	Icon: React.ElementType;
	href: string;
	label: string;
}) {
	return (
		<Link href={href} passHref>
			<a
				rel="noopener"
				className="inline-block p-2 rounded-sm hover:bg-bg"
				aria-label={label}
			>
				<Icon className="text-2xl sm:text-base" />
			</a>
		</Link>
	);
}

function Footer({ className }: FooterProps) {
	return (
		<footer
			className={clsx(
				className,
				'bg-bg-fade py-4 px-2 sm:p-6 flex flex-row justify-between text-center text-sm border-t border-bg-fade'
			)}
		>
			<LightDarkToggle />
			<ul className="mt-1 sm:mt-4 flex flex-row space-x-1">
				<li>
					<IconLink
						Icon={FaEnvelope}
						href="mailto:matt.e.greer@gmail.com"
						label="email me"
					/>
				</li>
				<li>
					<IconLink
						Icon={FaTwitter}
						href="https://twitter.com/mattegreer"
						label="my Twitter profile"
					/>
				</li>
				<li>
					<IconLink
						Icon={FaLinkedin}
						href="https://www.linkedin.com/in/matt-greer-133405ab/"
						label="my LinkedIn profile"
					/>
				</li>
				<li>
					<IconLink
						Icon={FaGithub}
						href="https://github.com/city41"
						label="my GitHub profile"
					/>
				</li>
				<li>
					<IconLink
						Icon={FaStackOverflow}
						href="https://stackoverflow.com/users/194940/matt-greer"
						label="my StackOverflow profile"
					/>
				</li>
			</ul>
		</footer>
	);
}

export { Footer };
