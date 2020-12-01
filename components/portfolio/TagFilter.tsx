import React from 'react';
import clsx from 'clsx';
import { Tag } from '../Tag';

type TagFilterProps = {
	className?: string;
	tags: TagLabel[];
	currentTag?: TagLabel | null;
};

function TagFilter({ className, tags, currentTag }: TagFilterProps) {
	return (
		<div className={clsx(className)}>
			<div className="text-2xl space-y-8 max-w-xl mt-4">
				{!currentTag ? (
					<p>All of my projects and articles</p>
				) : (
					<p>
						My projects and articles pertaining to{' '}
						<span className="font-bold">{currentTag}</span>
					</p>
				)}
			</div>
			<p className="mt-4">
				or filter by{' '}
				<ul className="inline-flex flex-row flex-wrap space-x-2 pl-4">
					{['All']
						.concat(tags)
						.sort()
						.map((t: TagLabel) => {
							if (t === currentTag || (t === 'All' && !currentTag)) {
								return null;
							}

							return (
								<Tag component="li" className="bg-bg-fade text-fg-fade">
									{t}
								</Tag>
							);
						})}
				</ul>
			</p>
		</div>
	);
}

export { TagFilter };
