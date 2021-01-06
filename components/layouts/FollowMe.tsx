import React from 'react';
import clsx from 'clsx';

type FollowMeProps = {
	className?: string;
};

function FollowMe({ className }: FollowMeProps) {
	return <div className={clsx(className, 'text-red')}>follow me</div>;
}

export { FollowMe };
