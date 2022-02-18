import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type Entry = {
	title: string;
	url: string;
};

type SectionProps = {
	className?: string;
	title: string;
	entries: Entry[];
};

function Section({ className, title, entries }: SectionProps) {
	return (
		<section className={clsx(className, 'flex flex-col space-y-4')}>
			<h1 className="text-3xl text-center">{title}</h1>
			{entries.map((entry) => (
				<Link key={entry.url} href={entry.url} passHref>
					<a>
						<div className="bg-red-50 h-64 cursor-pointer">
							<h2>{entry.title}</h2>
						</div>
					</a>
				</Link>
			))}
		</section>
	);
}

export { Section };
