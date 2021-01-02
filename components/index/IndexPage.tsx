import React from 'react';
import clsx from 'clsx';
import { FocalColorLink } from '../FocalColorLink';
import { ResumeLink } from '../ResumeLink';
import { Head } from '../layouts/Head';
import { Feature } from '../Feature';
import { Footer } from '../Footer';
import Link from 'next/link';

import styles from './IndexPage.module.css';
import headerStyles from '../Header.module.css';
import { FullBleedScript } from './FullBleedScript';

import otterPng from './otter.png';
import reflectionPng from './reflection.png';

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

const FULL_BLEED_ROOT_ID = '__full_bleed_id__';
const FULL_BLEED_TITLE_ID = '__full_bleed_title_id__';
const INTRO_ROOT_ID = '__intro_root_id__';

function IndexPage({ items }: IndexPageProps) {
	return (
		<>
			<Head
				title="Matt Greer"
				metaDescription="Matt Greer's portfolio and blog"
			/>
			<div
				id={FULL_BLEED_ROOT_ID}
				className={clsx(
					styles.mainBleed,
					'relative flex flex-col items-center justify-between text-white bg-fixed overflow-x-hidden'
				)}
			>
				<nav
					className={clsx(
						'flex flex-row px-2 sm:px-4 py-4 items-stretch justify-between self-end z-10'
					)}
				>
					<ul className="flex flex-row space-x-1 sm:space-x-4 text-xs items-stretch">
						<NavLink href="/projects">Projects</NavLink>
						<NavLink href="/articles">Articles</NavLink>
						<NavLink href="/about">About</NavLink>
						<NavLink href="/MattGreer_resume.pdf">Resume</NavLink>
					</ul>
				</nav>
				<div
					id={FULL_BLEED_TITLE_ID}
					className={clsx(
						styles.title,
						'flex-1 flex flex-col justify-center items-center z-10 md:mt-48'
					)}
				>
					<h1 className="text-5xl md:text-7xl font-bold">Matt Greer</h1>
					<h2 className="sm:text-2xl">software creator</h2>
				</div>
				<div
					className={clsx(
						styles.moreArrow,
						'justify-self-end z-10 hidden md:inline-block'
					)}
					aria-label="scroll down to see more"
				/>
			</div>
			<div
				id={INTRO_ROOT_ID}
				className={clsx(
					'grid grid-cols-8 gap-8 auto-rows-min max-w-6xl mx-auto px-8 sm:px-0 mt-24 mb-24'
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
			<div className="h-48 w-full bg-focal-alt text-white grid place-items-center text-3xl">
				Some things I have created{' '}
			</div>
			<div className="flex flex-col space-y-48 max-w-6xl sm:mx-auto mt-16 sm:mt-32">
				{items.map((item, index) => {
					return <Feature key={item.slug} {...item} suppressDate />;
				})}
			</div>
			<div className="h-32 w-full text-fg grid place-items-center text-2xl">
				<div>
					See more of my{' '}
					<FocalColorLink href="/projects">projects</FocalColorLink> and{' '}
					<FocalColorLink href="/articles">articles</FocalColorLink>
				</div>
			</div>
			<Footer className="mt-16" />
			<FullBleedScript
				rootId={FULL_BLEED_ROOT_ID}
				titleId={FULL_BLEED_TITLE_ID}
				nextInPageId={INTRO_ROOT_ID}
				floatingImgSrc={otterPng}
				reflectionImgSrc={reflectionPng}
			/>
		</>
	);
}

export { IndexPage };
