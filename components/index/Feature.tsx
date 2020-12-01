import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from '../Tag';

type FeatureProps = Omit<PortfolioItem, 'featureIndex'> & {
	className?: string;
	side: 'left' | 'right';
};

function buildUrl(classification: string, slug: string): string {
	return `/${classification}/${slug}`;
}

function Feature({
	className,
	title,
	description,
	side,
	classification,
	type,
	slug,
	tags,
}: FeatureProps) {
	const gradientAngle = side === 'left' ? '-120deg' : '120deg';
	const img = require(`../../pages/${classification}/${slug}/feature.png`);

	const style = {
		height: 500,
		'--bg-image': `url(${img})`,
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
				<Link href={buildUrl(classification, slug)} passHref>
					<a>
						<h2 className="text-3xl font-bold hover:underline">{title}</h2>
					</a>
				</Link>
				<div className="mb-2 py-1 text-gray-500 text-xs">{type}</div>
				<div className="text-sm mb-3">
					{description.map((paragraph) => (
						<p key={paragraph} className="my-4">
							{paragraph}
						</p>
					))}
				</div>
				<ul className="flex flex-row flex-wrap -mx-2">
					{tags.map((t) => (
						<Tag key={t} component="li" className="m-1">
							{t}
						</Tag>
					))}
				</ul>
			</div>
		</div>
	);
}

export { Feature };
