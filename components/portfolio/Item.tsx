import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Tag } from '../Tag';

type ItemProps = Omit<PortfolioItem, 'featureIndex'> & {
	className?: string;
};

function getUrl(classification: string, slug: string): string {
	return `/${classification}/${slug}`;
}

function Item({
	className,
	title,
	type,
	description,
	tags,
	classification,
	slug,
}: ItemProps) {
	return (
		<div className={clsx(className, 'flex flex-row space-x-8')}>
			<div className="bg-blue-100 self-stretch w-96" />
			<div className="w-64">
				<Link href={getUrl(classification, slug)} passHref>
					<a>
						<h2 className="text-2xl font-bold">{title}</h2>
					</a>
				</Link>
				<div className="mb-2 py-1 text-gray-500 text-xs">{type}</div>
				{description.map((para) => (
					<p key={para} className="my-4">
						{para}
					</p>
				))}
				<ul className="flex flex-row flex-wrap -mx-2">
					{tags.map((t) => (
						<Tag key={t} component="li" className="m-1">
							{t}
						</Tag>
					))}
				</ul>
			</div>
		</div>
	);
}

export { Item };
