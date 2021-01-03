import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from './Tag';

import styles from './Feature.module.css';

type FeatureProps = Omit<PortfolioItem, 'featureIndex'> & {
	className?: string;
	suppressDate?: boolean;
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
	suppressDate,
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
				'flex flex-row flex-wrap mx-4 sm:mx-16 md:mx-0'
			)}
		>
			<div
				className={clsx(
					styles.image,
					'h-72 sm:h-96 w-screen sm:w-1/2 sm:pr-8 -mx-4 sm:mx-0'
				)}
				style={style}
			/>
			<div className="w-full sm:w-1/2 sm:pl-8">
				<Link href={buildUrl(classification, slug)} passHref>
					<a>
						<h2 className="text-5xl font-bold mt-8 sm:mt-0 text-center sm:text-left">
							{title}
						</h2>
					</a>
				</Link>
				<div className="mb-2 py-1 text-gray-500 text-xs mb-8 text-center sm:text-left">
					{(date &&
						!suppressDate &&
						new Date(date).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})) ||
						type}
				</div>
				<p className="sm:text-2xl">{description}</p>
				<ul className="flex flex-row flex-wrap -mx-2 mt-8">
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
