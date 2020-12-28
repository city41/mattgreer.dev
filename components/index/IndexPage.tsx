import React from 'react';
import clsx from 'clsx';
import styles from '../Header.module.css';
import { FocalColorLink } from '../FocalColorLink';
import { ResumeLink } from '../ResumeLink';
import { Feature } from '../Feature';
import { Footer } from '../Footer';

type IndexPageProps = {
	items: PortfolioItem[];
};

function IndexPage({ items }: IndexPageProps) {
	return (
		<div>
			<div className="h-screen flex flex-col items-center justify-center bg-green-50">
				<h1 className="text-7xl">Matt Greer</h1>
				<h2 className="text-2xl">software creator</h2>
			</div>
			<div
				className={clsx(
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0'
				)}
			>
				<div
					className={clsx(
						styles.headerIllustration,
						styles.indexPageHeaderIllustration,
						'col-start-1 col-end-9 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch -mx-8 sm:mx-0'
					)}
				/>
				<div className="col-start-1 col-end-9 sm:row-start-2 sm:col-start-4 sm:col-end-8 sm:text-2xl space-y-8 leading-6 sm:leading-9">
					<p>
						Hi! I am a freelance software engineer with a focus on web
						technologies.
					</p>
					<p>
						Check out my{' '}
						<FocalColorLink href="/projects">projects</FocalColorLink>,{' '}
						<FocalColorLink href="/articles">articles</FocalColorLink>,{' '}
						<FocalColorLink href="/about">about page</FocalColorLink>, or my{' '}
						<ResumeLink />.
					</p>
					<p>
						Or,{' '}
						<FocalColorLink href="mailto:matt.e.greer@gmail.com">
							get in touch
						</FocalColorLink>
						.
					</p>
				</div>
			</div>
			<div className="h-32 grid place-items-center font-bold">
				Some things I have created{' '}
			</div>
			<div className="flex flex-col space-y-48 overflow-x-hidden max-w-6xl -mx-8 sm:mx-auto">
				{items.map((item, index) => {
					return <Feature key={item.slug} {...item} />;
				})}
			</div>
			<div className="h-48 grid place-items-center font-bold">
				<div>
					See more of my{' '}
					<FocalColorLink href="/projects">projects</FocalColorLink> and{' '}
					<FocalColorLink href="/articles">articles</FocalColorLink>
				</div>
			</div>
			<Footer className="mt-16 sm:mt-24" />
		</div>
	);
}

export { IndexPage };
