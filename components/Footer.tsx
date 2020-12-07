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
import { ResumeLink } from './ResumeLink';

type FooterProps = {
	className?: string;
};

function IconLink({ Icon, href }: { Icon: React.ElementType; href: string }) {
	return (
		<Link href={href} passHref>
			<a rel="noopener" className="inline-block p-2 rounded-sm hover:bg-bg">
				<Icon />
			</a>
		</Link>
	);
}

function Footer({ className }: FooterProps) {
	return (
		<footer
			className={clsx(
				className,
				'bg-bg-fade p-4 sm:p-16 flex flex-col items-center justify-center text-center text-sm border-t border-bg-fade'
			)}
		>
			<ul className="mt-4 flex flex-row space-x-6 text-xs sm:text-base">
				<li>
					<Link href="/about" passHref>
						<a className="hover:underline">About</a>
					</Link>
				</li>
				<li>
					<Link href="/portfolio" passHref>
						<a className="hover:underline">Portfolio</a>
					</Link>
				</li>
				<li>
					<Link href="/quick-thoughts" passHref>
						<a className="hover:underline">Quick Thoughts</a>
					</Link>
				</li>
				<li>
					<ResumeLink el="a" className="hover:underline">
						Resume
					</ResumeLink>
				</li>
			</ul>
			<ul className="mt-1 sm:mt-4 flex flex-row space-x-1">
				<li>
					<IconLink Icon={FaEnvelope} href="mailto:matt.e.greer@gmail.com" />
				</li>
				<li>
					<IconLink Icon={FaTwitter} href="https://twitter.com/mattegreer" />
				</li>
				<li>
					<IconLink
						Icon={FaLinkedin}
						href="https://www.linkedin.com/in/matt-greer-133405ab/"
					/>
				</li>
				<li>
					<IconLink Icon={FaGithub} href="https://github.com/city41" />
				</li>
				<li>
					<IconLink
						Icon={FaStackOverflow}
						href="https://stackoverflow.com/users/194940/matt-greer"
					/>
				</li>
			</ul>
		</footer>
	);
}

export { Footer };
