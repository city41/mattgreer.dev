import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from './Tag';

import { HiExternalLink } from 'react-icons/hi';

import pixelatedStyles from './pixelated.module.css';
import { dateToHumanString } from '../util/dates';

type FeatureProps = Omit<FeatureItem, 'featureIndex'> & {
	className?: string;
	suppressDate?: boolean;
};

function Feature({
	className,
	title,
	imgFile,
	imgAlt,
	pixelateImage,
	description,
	classification,
	slug,
	type,
	date,
	suppressDate,
	url,
	tags,
}: FeatureProps) {
	const img = require(`../pages/${classification}/${slug}/${imgFile}`);

	const external = url.startsWith('http');
	const linkProps = external ? { rel: 'noopener', target: '_blank' } : {};

	return (
		<div
			className={clsx(
				className,
				'flex flex-row flex-wrap mx-4 sm:mx-16 md:mx-0 justify-center'
			)}
		>
			<Link href={url} passHref>
				<a
					className="block w-screen sm:w-96 sm:h-96 sm:mr-8 -mx-4 sm:ml-0 cursor-pointer"
					{...linkProps}
				>
					<img
						className={clsx('block w-full h-full', {
							[pixelatedStyles.pixelated]: pixelateImage,
						})}
						src={img}
						width={384}
						height={384}
						alt={imgAlt}
						loading="lazy"
					/>
				</a>
			</Link>
			<div className="w-full sm:w-1/2 sm:pl-8">
				<Link href={url} passHref>
					<a {...linkProps}>
						<h2 className="text-4xl sm:text-5xl font-bold mt-8 sm:mt-0 xtext-center sm:text-left hover:text-focal-alt">
							{title}
							{external && (
								<HiExternalLink className="inline text-2xl text-fg-fade ml-2" />
							)}
						</h2>
					</a>
				</Link>
				<div className="my-2 py-1 text-gray-500 text-xs mb-8 xtext-center sm:text-left">
					{(date && !suppressDate && (
						<time dateTime={date}>{dateToHumanString(date)}</time>
					)) || <span>type</span>}
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
