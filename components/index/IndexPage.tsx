import React from 'react';
import clsx from 'clsx';
import { FocalColorLink } from '../FocalColorLink';
import { ResumeLink } from '../ResumeLink';
import { Feature } from '../Feature';
import { Footer } from '../Footer';
import Link from 'next/link';

import styles from './IndexPage.module.css';
import headerStyles from '../Header.module.css';

type IndexPageProps = {
	items: PortfolioItem[];
};

function NavLink({ href, children }) {
	return (
		<li style={{ marginBottom: -2 }}>
			<Link href={href} passHref>
				<a className="border-b-2 px-1 sm:px-2 h-full grid place-items-center text-white border-transparent hover:bg-bg-fade">
					{children}
				</a>
			</Link>
		</li>
	);
}
function IndexPage({ items }: IndexPageProps) {
	return (
		<div className="overflow-x-hidden">
			<div
				className={clsx(
					styles.mainBleed,
					'flex flex-col items-center justify-between text-white bg-fixed bg-focal-alt'
				)}
			>
				<nav
					className={clsx(
						'flex flex-row px-2 sm:px-4 py-4 items-stretch justify-between self-end'
					)}
				>
					<ul className="flex flex-row space-x-1 sm:space-x-4 text-xs items-stretch">
						<NavLink href="/projects">Projects</NavLink>
						<NavLink href="/articles">Articles</NavLink>
						<NavLink href="/about">About</NavLink>
						<NavLink href="/MattGreer_resume.pdf">Resume</NavLink>
					</ul>
				</nav>
				<div className="flex-1 flex flex-col justify-center items-center">
					<h1 className="text-5xl sm:text-7xl font-bold">Matt Greer</h1>
					<h2 className="sm:text-2xl">software creator</h2>
				</div>
			</div>
			<div
				className={clsx(
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0 my-24'
				)}
			>
				<div
					className={clsx(
						headerStyles.headerIllustration,
						headerStyles.indexPageHeaderIllustration,
						'col-start-1 col-end-9 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-5 self-stretch'
					)}
				/>
				<div className="col-start-1 col-end-9 sm:row-start-2 sm:col-start-5 sm:col-end-8 sm:text-2xl space-y-8 leading-6 sm:leading-9">
					<p>
						<span className="text-4xl font-bold">Hi!</span> I'm Matt, a
						freelance software engineer based in Michigan. I tend to focus on
						web technologies, but enjoy working with all types of software.
					</p>
					<p>
						Check out my{' '}
						<FocalColorLink href="/projects">projects</FocalColorLink>,{' '}
						<FocalColorLink href="/articles">articles</FocalColorLink>, or my{' '}
						<ResumeLink />.
					</p>
					<p>
						I am always looking for interesting projects. If you are in need of
						some help,{' '}
						<FocalColorLink href="mailto:matt.e.greer@gmail.com">
							get in touch
						</FocalColorLink>
						.
					</p>
				</div>
			</div>
			<div className="h-64 w-screen bg-focal-alt text-white grid place-items-center text-2xl">
				Some things I have created{' '}
			</div>
			<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl -mx-8 sm:mx-auto sm:-my-16">
				{items.map((item, index) => {
					return <Feature key={item.slug} {...item} />;
				})}
			</div>
			<div className="h-64 w-screen bg-focal-alt text-white grid place-items-center text-2xl">
				<div>
					See more of my{' '}
					<FocalColorLink href="/projects">projects</FocalColorLink> and{' '}
					<FocalColorLink href="/articles">articles</FocalColorLink>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export { IndexPage };
