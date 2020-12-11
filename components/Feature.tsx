import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from './Tag';

import styles from './Feature.module.css';

type FeatureProps = Omit<PortfolioItem, 'featureIndex'> & {
	className?: string;
};

function buildUrl(classification: string, slug: string): string {
	return `/${classification}/${slug}`;
}

function Feature({
	className,
	title,
	imgFile,
	description,
	classification,
	type,
	date,
	slug,
	tags,
}: FeatureProps) {
	const img = require(`../pages/${classification}/${slug}/${imgFile}`);

	const style = {
		'--bg-image': `url(${img})`,
	} as CSSProperties;

	return (
		<div
			className={clsx(
				className,
				styles.feature,
				'flex flex-row sm:items-stretch justify-center -mx-6 sm:justify-start'
			)}
			style={style}
		>
			<div
				className={clsx(
					styles.callout,
					'p-8 sm:p-12 w-72 sm:w-80 my-16 sm:my-0 flex flex-col justify-center text-white bg-black'
				)}
			>
				<Link href={buildUrl(classification, slug)} passHref>
					<a>
						<h2 className="text-2xl sm:text-3xl font-bold hover:underline">
							{title}
						</h2>
					</a>
				</Link>
				<div className="mb-2 py-1 text-gray-500 text-xs">
					{(date &&
						new Date(date).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})) ||
						type}
				</div>
				<div className="text-sm mb-3">
					{description.map((paragraph) => (
						<p key={paragraph} className="my-4">
							{paragraph}
						</p>
					))}
				</div>
				<ul className="flex flex-row flex-wrap -mx-2">
					{tags.map((t) => (
						<li key={t}>
							<Tag className="m-1" classification={classification}>
								{t}
							</Tag>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export { Feature };
