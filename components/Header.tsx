import React from 'react';
import clsx from 'clsx';

import styles from './Header.module.css';

type HeaderProps = {
	className?: string;
	title: string;
	page?: string;
	img?: string;
	children?: React.ReactNode;
};

function Header({ className, title, page, img, children }: HeaderProps) {
	const imgStyle = img
		? { backgroundImage: `url(${img})`, backgroundSize: 'cover' }
		: {};
	return (
		<>
			<header
				className={clsx(
					className,
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0'
				)}
			>
				<div
					className={clsx(
						styles.headerIllustration,
						styles[`${page}PageHeaderIllustration`],
						'col-start-1 col-end-9 h-64 sm:h-auto sm:row-span-2 sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch -mx-8 sm:mx-0'
					)}
					style={imgStyle}
				/>
				<h1 className="col-start-1 col-end-9 sm:row-start-1 sm:col-start-4 sm:col-end-9 text-4xl sm:text-7xl font-black text-focal">
					{title}
				</h1>
				{children && (
					<div className="col-start-1 col-end-9 sm:row-start-2 sm:col-start-4 sm:col-end-8 sm:text-2xl space-y-8 leading-6 sm:leading-9">
						{children}
					</div>
				)}
			</header>
		</>
	);
}

export { Header };
