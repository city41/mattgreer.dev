import React from 'react';
import clsx from 'clsx';
import indexPageStyles from '../index/IndexPage.module.css';

import { FaTwitter } from 'react-icons/fa';

import { FocalColorLink } from '../FocalColorLink';

type FollowMeProps = {
	className?: string;
};

function FollowMe({ className }: FollowMeProps) {
	return (
		<div
			className={clsx(
				className,
				'FocalAltBackground flex flex-col sm:flex-row sm:items-start bg-focal-alt -mx-8 sm:mx-0 px-8 sm:px-4 py-6 sm:py-4 text-white'
			)}
		>
			<div
				className={clsx(
					indexPageStyles.portraitIllustration,
					'w-full sm:w-1/3 h-48 sm:mr-4'
				)}
			/>
			<div className="w-full sm:w-2/3 space-y-4">
				<h3 className="text-3xl mb-4">About me</h3>
				<p>
					I am a{' '}
					<FocalColorLink href="/hire-me">
						freelance software engineer
					</FocalColorLink>{' '}
					with a focus on web development. I also enjoy game dev as a hobby.
					Previously I worked for Netflix and Microsoft.
				</p>

				<div className="flex flex-row">
					<FaTwitter
						className="text-6xl mr-4 cursor-pointer"
						aria-label="Twitter logo"
					/>
					<p>
						<FocalColorLink href="https://twitter.com/mattegreer">
							Follow me on Twitter
						</FocalColorLink>{' '}
						to be notified when I post new content
					</p>
				</div>
			</div>
		</div>
	);
}

export { FollowMe };
