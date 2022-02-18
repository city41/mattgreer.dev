import React from 'react';
import clsx from 'clsx';

import styles from './HelpSection.module.css';

type HelpSectionProps = {
	className?: string;
	title: String;
	children: React.ReactNode;
};

function HelpSection({ className, title, children }: HelpSectionProps) {
	return (
		<div
			className={clsx(className, styles.HelpSection, 'bg-bg-fade text-fg p-4')}
		>
			<h3 className="font-bold text-2xl mb-2">{title}</h3>
			<div>{children}</div>
		</div>
	);
}

export { HelpSection };
