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
		background: `linear-gradient(${gradientAngle}, transparent, rgba(255, 255,255, 0.85)), var(--bg-image)`,
		backgroundSize: 'cover, cover',
		backgroundPosition: 'center, center',
	};

	return (
		<div
			className={clsx(
				className,
				'flex flex-row items-center justify-center py-8 sm:px-16',
				{
					'sm:justify-start': side === 'left',
					'sm:justify-end': side === 'right',
				}
			)}
			style={style}
		>
			<div
				className="p-6 w-64 flex flex-col items-center text-black bg-white shadow-2xl"
				style={
					{
						// height: '80%',
						// '--tw-bg-opacity': 0.75,
						'--tw-shadow': '0 25px 50px -12px rgba(0, 0, 0, 1)',
					} as CSSProperties
				}
			>
				<div className="-mt-6 -mx-6 mb-3 p-2 bg-gray-100 text-gray-500 text-xs text-center self-stretch">
					{type}
				</div>
				<h2 className="text-3xl font-bold">{title}</h2>
				<p className="py-2 text-sm flex-1">
					Create game levels in your browser. Easy to use and powerful.
				</p>
				<ul className="flex flex-row space-x-2 mt-4">
					<li className="bg-black text-white py-1 px-2 text-xs">React</li>
					<li className="bg-black text-white py-1 px-2 text-xs">TypeScript</li>
					<li className="bg-black text-white py-1 px-2 text-xs">Redux</li>
				</ul>
			</div>
		</div>
	);
}

export { Feature };
