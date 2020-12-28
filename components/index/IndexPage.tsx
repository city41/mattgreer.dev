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
			<div
				className="h-screen flex flex-col items-center justify-center text-white bg-fixed"
				style={{
					backgroundImage:
						'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMzUpICI+PHJlY3QgaWQ9InBhdHRlcm4tYmFja2dyb3VuZCIgd2lkdGg9IjQwMCUiIGhlaWdodD0iNDAwJSIgZmlsbD0iIzJhNDM2NSI+PC9yZWN0PiA8Y2lyY2xlIGZpbGw9IiMxYTIwMmMiIGN4PSI0MCIgY3k9IjIwIiByPSIwLjI1Ij48L2NpcmNsZT48Y2lyY2xlIGZpbGw9IiNlY2M5NGIiIGN4PSIwIiBjeT0iMjAiIHI9IjEiPjwvY2lyY2xlPjxjaXJjbGUgZmlsbD0iI2VjYzk0YiIgY3g9IjQwIiBjeT0iMjAiIHI9IjEiPjwvY2lyY2xlPjwvcGF0dGVybj4gIDwvZGVmcz4gPHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg==")',
				}}
			>
				<h1 className="text-7xl">Matt Greer</h1>
				<h2 className="text-2xl">software creator</h2>
			</div>
			<div
				className={clsx(
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0 my-52'
				)}
			>
				<div
					className={clsx(
						styles.headerIllustration,
						styles.indexPageHeaderIllustration,
						'col-start-1 col-end-9 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch'
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
