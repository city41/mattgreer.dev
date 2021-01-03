import React from 'react';
import clsx from 'clsx';

import styles from './Header.module.css';

type HeaderProps = {
	className?: string;
	title: string;
	img?: string;
	children?: React.ReactNode;
	childrenUnderTitle?: boolean;
};

function Header({
	className,
	title,
	img,
	children,
	childrenUnderTitle,
}: HeaderProps) {
	return (
		<header className="bg-focal-alt w-full py-12">
			<img
				className={clsx(
					styles.image,
					'sm:hidden bg-contain bg-center bg-no-repeat w-full h-64 mb-16'
				)}
				src={img}
			/>
			<div
				className={clsx(
					className,
					'grid grid-cols-8 gap-8 auto-rows-min max-w-4xl mx-auto px-8 sm:px-0'
				)}
			>
				<img
					className={clsx(
						styles.image,
						'hidden sm:block sm:h-auto sm:row-start-1 sm:col-start-1 sm:col-end-4 self-stretch sm:mx-0 bg-contain bg-center bg-no-repeat',
						{
							'sm:row-span-2': childrenUnderTitle,
						}
					)}
					src={img}
				/>
				<h1
					className="col-start-1 col-end-9 sm:row-start-1 sm:col-start-4 sm:col-end-9 text-5xl sm:text-7xl font-black text-white"
					style={{ alignSelf: 'center' }}
				>
					{title}
				</h1>
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
