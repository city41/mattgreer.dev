import React from 'react';
import clsx from 'clsx';

import styles from './Header.module.css';
import pixelatedStyles from '../pixelated.module.css';

type HeaderProps = {
	className?: string;
	title?: string;
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
	const imgStyle = { backgroundImage: `url(${img})`, height: '12rem' };

	return (
		<header
			className={clsx(
				styles.root,
				'FocalAltBackground bg-bg-fade w-full pb-8 shadow-lg'
			)}
		>
			<div
				className={clsx(
					className,
					'flex flex-row gap-x-4 items-center justify-center'
				)}
			>
				<div
					className={clsx(
						'hidden sm:block h-64 w-64 sm:h-auto sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch sm:mx-0 bg-contain bg-center bg-no-repeat',
						{
							'sm:row-span-2': childrenUnderTitle,
							[pixelatedStyles.pixelated]: pixelateImage,
						}
					)}
					style={imgStyle}
					role="img"
					aria-label={imgAlt}
				/>
				<div className="max-w-fit sm:max-w-64 mx-4 sm:mx-0">
					{title && (
						<h1 className="text-3xl mt-4 sm:mt-0 sm:text-5xl font-black text-fg max-w-full sm:max-w-xl">
							{title}
						</h1>
					)}
					{metaForTitle && (
						<div className="text-xs text-fg mt-2">{metaForTitle}</div>
					)}
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
			{/* <div className="mt-12 w-full sm:w-1/2 mx-auto py-4 px-2 bg-bg text-focal grid place-items-center text-2xl sm:text-3xl border-b-2 sm:border-t-0 border-focal" /> */}
		</header>
	);
}

export { Header };
