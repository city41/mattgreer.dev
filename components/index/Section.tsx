import React from 'react';
import clsx from 'clsx';

type SectionProps = {
	className?: string;
	title?: string;
	children?: React.ReactNode;
};

function Section({ className, title }: SectionProps) {
	return (
		<section className={clsx(className, 'flex flex-col space-y-4')}>
			{title && <h1 className="text-3xl text-center">{title}</h1>}
			<div className="bg-red-50 h-64" />
			<div className="bg-blue-50 h-64" />
			<div className="bg-green-100 h-64" />
		</section>
	);
}

export { Section };
