import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from '../Tag';

import jumpClubPng from './jumpclub.png';
import webstormJpg from './webstorm.jpg';
import nggmPng from './nggm.png';
import saturnPng from './saturn.png';

type FeatureProps = {
	className?: string;
	title: string;
	blurb: React.ReactNode;
	side: 'left' | 'right';
	type: 'website' | 'technical article' | 'interactive article';
	slug: string;
	tags: string[];
};

const backgroundImages = {
	'Jump.Club': `url(${jumpClubPng})`,
	'JavaScript Promises ... in Wicked Detail': `url(${webstormJpg})`,
	'Closet Designer': `url(${nggmPng})`,
	'The Sega Saturn and Transparency': `url(${saturnPng})`,
};

function Feature({
	className,
	title,
	blurb,
	side,
	type,
	slug,
	tags,
}: FeatureProps) {
	const gradientAngle = side === 'left' ? '-120deg' : '120deg';

	const style = {
		height: 500,
		'--bg-image': backgroundImages[title] ?? '',
		background: `linear-gradient(${gradientAngle},
										/* hsla(var(--color-bg-h), var(--color-bg-s), var(--color-bg-l), 0.35), */ 
										transparent,
										transparent),
										/*hsla(var(--color-fg-h), var(--color-fg-s), var(--color-fg-l), 0.9) 60%, var(--color-fg)), */
								 var(--bg-image)`,
		backgroundSize: 'cover, cover',
		backgroundPosition: 'center, center',
	};

	return (
		<div
			className={clsx(className, 'flex flex-row items-stretch justify-center', {
				'sm:justify-start': side === 'left',
				'sm:justify-end': side === 'right',
			})}
			style={style}
		>
			<div
				className="p-12 w-72 flex flex-col justify-center text-white bg-black"
				style={
					{
						'--tw-bg-opacity': 0.75,
						backdropFilter: 'blur(20px)',
					} as CSSProperties
				}
			>
				<Link href={slug} passHref>
					<a>
						<h2 className="text-3xl font-bold hover:underline">{title}</h2>
					</a>
				</Link>
				<div className="my-2 text-sm">{blurb}</div>
				<div className="mb-2 py-1 text-gray-500 text-xs">{type}</div>
				<ul className="flex flex-row space-x-2 -mx-2">
					{tags.map((t) => (
						<Tag key={t} component="li">
							{t}
						</Tag>
					))}
				</ul>
			</div>
		</div>
	);
}

export { Feature };
