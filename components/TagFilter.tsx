import React from 'react';
import clsx from 'clsx';
import { Tag } from './Tag';

type TagFilterProps = {
	className?: string;
	tags: TagLabel[];
	currentTag?: TagLabel | null;
	classification: 'projects' | 'articles';
};

function TagFilter({
	className,
	tags,
	currentTag,
	classification,
}: TagFilterProps) {
	return (
		<div className={clsx(className)}>
			<div className="text-2xl space-y-8 max-w-xl mt-4">
				{!currentTag ? (
					<p>All of my {classification}</p>
				) : (
					<p>
						My {classification} pertaining to{' '}
						<span className="font-bold text-focal-alt">{currentTag}</span>
					</p>
				)}
			</div>
			<p className="mt-16 sm:mt-12 mb-2 text-gray-500 text-sm">or filter by </p>
			<ul className="flex flex-row flex-wrap">
				{['All']
					.concat(tags)
					.sort()
					.map((t: TagLabel) => {
						if (t === currentTag || (t === 'All' && !currentTag)) {
							return null;
						}

						return (
							<Tag
								key={t}
								classification={classification}
								component="li"
								className="bg-bg-fade text-fg-fade mb-2 mr-2"
							>
								{t}
							</Tag>
						);
					})}
			</ul>
		</div>
	);
}

export { TagFilter };
