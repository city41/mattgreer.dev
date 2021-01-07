import React from 'react';
import clsx from 'clsx';

import { FaTwitter, FaRss } from 'react-icons/fa';

import { FocalColorLink } from '../FocalColorLink';

type FollowMeProps = {
	className?: string;
};

function FollowMe({ className }: FollowMeProps) {
	return (
		<div
			className={clsx(
				className,
				'FocalAltBackground text-base sm:text-lg bg-focal-alt text-white p-4 text-center'
			)}
		>
			<h3 className="text-2xl font-bold">Thanks for stopping by</h3>
			<p className="mb-4 text-base">To get notified when I post new stuff</p>
			<div className="flex flex-col sm:flex-row justify-around items-center text-center">
				<div className="flex flex-row items-center mb-4 sm:mb-0">
					<FaTwitter className="text-6xl pr-4" />
					<FocalColorLink href="https://twitter.com/mattegreer">
						@mattegreer
					</FocalColorLink>
				</div>
				<div className="flex flex-row items-center">
					<FaRss className="text-6xl pr-4" />
					<FocalColorLink href="/feed.xml">RSS feed</FocalColorLink>
				</div>
			</div>
		</div>
	);
}

export { FollowMe };
