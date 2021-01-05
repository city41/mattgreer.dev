import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from './Tag';

import pixelatedStyles from './pixelated.module.css';
import { dateToHumanString } from '../util/dates';

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
	pixelateImage,
	description,
	classification,
	type,
	date,
	suppressDate,
	slug,
	tags,
}: FeatureProps) {
	const img = require(`../pages/${classification}/${slug}/${imgFile}`);
	const url = buildUrl(classification, slug);

	return (
		<div
			className={clsx(
				className,
				'flex flex-row flex-wrap mx-4 sm:mx-16 md:mx-0 justify-center'
			)}
		>
			<Link href={url} passHref>
				<a className="block w-screen sm:w-96 sm:h-96 sm:mr-8 -mx-4 sm:ml-0 cursor-pointer">
					<img
						className={clsx('block w-full h-full', {
							[pixelatedStyles.pixelated]: pixelateImage,
						})}
						src={img}
						width={384}
						height={384}
					/>
				</a>
			</Link>
			<div className="w-full sm:w-1/2 sm:pl-8">
				<Link href={url} passHref>
					<a>
						<h2 className="text-5xl font-bold mt-8 sm:mt-0 xtext-center sm:text-left">
							{title}
						</h2>
					</a>
				</Link>
				<div className="my-2 py-1 text-gray-500 text-xs mb-8 xtext-center sm:text-left">
					{(date && !suppressDate && dateToHumanString(date)) || type}
				</div>
				<div className="space-y-4">
					{description.map((para, i) => (
						<p key={i} className="sm:text-2xl">
							{para}
						</p>
					))}
				</div>
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
