import React from 'react';
import clsx from 'clsx';
import { FocalColorLink } from '../FocalColorLink';
import { Head } from '../layouts/Head';
import { Navigation } from '../Navigation';
import { Feature } from '../Feature';
import { Footer } from '../Footer';

import styles from './IndexPage.module.css';

import otterSvg from './otter.svg';

type IndexPageProps = {
	items: FeatureItem[];
};

function IndexPage({ items }: IndexPageProps) {
	return (
		<>
			<Head title="Matt Greer" metaDescription="My portfolio and blog" />
			<Navigation className={styles.navigation} noLogo />
			<div
				className={clsx(
					'grid grid-cols-8 gap-8 auto-rows-min max-w-6xl mx-auto px-8 sm:px-0 mt-24 mb-8 sm:mb-24'
				)}
			>
				<div
					className={clsx(
						styles.portraitIllustration,
						'col-start-1 col-end-9 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-5 self-stretch'
					)}
					style={{ minHeight: '24rem' }}
				/>
				<div className="col-start-1 col-end-9 sm:row-start-2 sm:col-start-5 sm:col-end-8 sm:text-2xl space-y-8 leading-6 sm:leading-9 sm:my-16">
					<p>
						<span className="text-4xl font-bold">Hi!</span> I'm Matt Greer, a
						freelance web engineer based in Michigan. I have deep and extensive
						experience building websites of all kinds, on both the front end and
						back end.
					</p>
					<p>
						I am always{' '}
						<FocalColorLink href="/hire-me">
							looking for interesting projects
						</FocalColorLink>
						.
					</p>
				</div>
			</div>
			<div className="my-24 sm:mt-0 w-full sm:w-1/2 mx-auto py-4 px-2 bg-bg text-focal grid place-items-center text-2xl sm:text-3xl border-b-2 sm:border-t-0 border-focal">
				A few things I have created{' '}
			</div>
			<div className="flex flex-col space-y-32 sm:space-y-48 max-w-6xl sm:mx-auto mt-16 sm:mt-32 sm:mb-16">
				{items.map((item, index) => {
					return <Feature key={item.slug} {...item} tags={[]} suppressDate />;
				})}
			</div>
			<div className="hidden sm:block sm:ml-16 -mb-4">
				<img
					className="w-16 sm:w-24"
					src={otterSvg}
					alt="a cartoon otter"
					width={96}
					height={37}
				/>
			</div>
			<Footer className="mt-16 sm:mt-0" />
		</>
	);
}

export { IndexPage };
