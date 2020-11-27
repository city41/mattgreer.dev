import React, { CSSProperties } from 'react';
import clsx from 'clsx';

// @ts-ignore
import jumpClubPng from './jumpclub.png';
// @ts-ignore
import webstormJpg from './webstorm.jpg';
// @ts-ignore
import nggmPng from './nggm.png';
// @ts-ignore
import saturnPng from './saturn.png';

type FeatureProps = {
	className?: string;
	title: string;
	side: 'left' | 'right';
	type: 'website' | 'technical article' | 'interactive article';
};

const backgroundImages = {
	'Jump.Club': `url(${jumpClubPng})`,
	'JavaScript Promises': `url(${webstormJpg})`,
	'Closet Designer': `url(${nggmPng})`,
	'The Sega Saturn and Transparency': `url(${saturnPng})`,
};

function Feature({ className, title, side, type }: FeatureProps) {
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
						// height: '100%',
						'--tw-bg-opacity': 0.75,
						backdropFilter: 'blur(20px)',
					} as CSSProperties
				}
			>
				<h2 className="text-3xl font-bold">{title}</h2>
				<p className="py-2 text-sm">
					Create game levels in your browser. Easy to use and powerful.
				</p>
				<div className="mb-2 py-1 text-gray-500 text-xs">{type}</div>
				<ul className="flex flex-row space-x-2 -mx-2">
					<li className="bg-focal text-white py-1 px-2 text-xs">React</li>
					<li className="bg-focal text-white py-1 px-2 text-xs">TypeScript</li>
					<li className="bg-focal text-white py-1 px-2 text-xs">Redux</li>
				</ul>
			</div>
		</div>
	);
}

export { Feature };
