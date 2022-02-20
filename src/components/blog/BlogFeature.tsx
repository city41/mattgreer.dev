import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { dateToHumanString } from '../../util/dates';
import { Tag } from '../Tag';

import styles from './BlogFeature.module.css';

type BlogFeatureProps = Omit<FeatureItem, 'featureIndex'> & {
	className?: string;
};

function BlogFeature({
	className,
	title,
	description,
	slug,
	date,
	tags,
}: BlogFeatureProps) {
	return (
		<div
			className={clsx(
				className,
				'flex flex-row flex-wrap mx-4 sm:mx-16 md:mx-0 justify-center'
			)}
		>
			<div className="w-full">
				<div className="flex flex-row items-center space-x-4">
					<time className="text-fg text-xs whitespace-nowrap" dateTime={date}>
						{dateToHumanString(date)}
					</time>
					<ul className="flex flex-row flex-wrap">
						{tags.sort().map((t) => (
							<li key={t}>
								<Tag className={clsx(styles.tag)} classification="blog">
									{t}
								</Tag>
							</li>
						))}
					</ul>
				</div>
				<Link href={`/blog/${slug}`} passHref>
					<a>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 hover:text-focal">
							{title}
						</h2>
					</a>
				</Link>
				<div className="space-y-2">
					{description.map((para, i) => (
						<p key={i} className="sm:text-base">
							{para}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

export { BlogFeature };
