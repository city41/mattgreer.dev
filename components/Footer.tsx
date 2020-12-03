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

function IconLink({ Icon, href }: { Icon: React.ElementType; href: string }) {
	return (
		<Link href={href} passHref>
			<a rel="noreferrer noopener">
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
