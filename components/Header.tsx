import React from 'react';
import clsx from 'clsx';

import styles from './Header.module.css';
import pixelatedStyles from './pixelated.module.css';

type HeaderProps = {
	className?: string;
	title: string;
	metaForTitle?: string;
	img: string;
	pixelateImage?: boolean;
	imgAlt: string;
	children?: React.ReactNode;
	childrenUnderTitle?: boolean;
};

function Header({
	className,
	title,
	metaForTitle,
	img,
	pixelateImage,
	imgAlt,
	children,
	childrenUnderTitle,
}: HeaderProps) {
	const imgStyle = { backgroundImage: `url(${img})`, minHeight: '16rem' };

	return (
		<header
			className={clsx(
				styles.root,
				'FocalAltBackground bg-focal-alt w-full py-12'
			)}
		>
			<div
				className={clsx(
					className,
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0'
				)}
			>
				<div
					className={clsx(
						'hidden sm:block h-64 sm:h-auto sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch sm:mx-0 bg-contain bg-center bg-no-repeat',
						{
							'sm:row-span-2': childrenUnderTitle,
							[pixelatedStyles.pixelated]: pixelateImage,
						}
					)}
					style={imgStyle}
					role="img"
					aria-label={imgAlt}
				/>
				<div
					className="col-start-1 col-end-9 sm:row-start-1 sm:col-start-4 sm:col-end-9"
					style={{ alignSelf: 'center' }}
				>
					{metaForTitle && (
						<div className="text-xs text-white mb-2">{metaForTitle}</div>
					)}
					<h1 className="text-4xl sm:text-6xl font-black text-white">
						{title}
					</h1>
				</div>
				{children && (
					<div
						className={clsx(
							'col-start-1 col-end-9 sm:row-start-2 sm:col-start-1 sm:col-end-8 sm:text-2xl space-y-8 leading-6 sm:leading-9',
							{
								'sm:col-start-1': !childrenUnderTitle,
								'sm:col-start-4': childrenUnderTitle,
							}
						)}
					>
						{children}
					</div>
				)}
			</div>
		</header>
	);
}

export { Header };
