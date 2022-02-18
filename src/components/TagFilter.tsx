import React from 'react';
import clsx from 'clsx';
import { Tag } from './Tag';
import { toWords } from 'number-to-words';

type TagFilterProps = {
	className?: string;
	tags: string[];
	currentTag?: string | null;
	classification: 'projects' | 'articles' | 'blog';
	count: number;
};

function toCapitalizedWord(n: number): string {
	if (n === 2) {
		return 'Both of my';
	}

	const asWord = toWords(n);

	return asWord[0].toUpperCase() + asWord.slice(1);
}

function singular(s: string, count: number): string {
	if (count === 1) {
		return s.replace(/s$/, '');
	}
	return s;
}

function getClassificationNoun(
	classification: TagFilterProps['classification']
): string {
	if (classification === 'blog') {
		return 'blog posts';
	}

	return classification;
}

function TagFilter({
	className,
	tags,
	currentTag,
	classification,
	count,
}: TagFilterProps) {
	return (
		<div className={clsx(className, 'flex flex-col gap-y-6')}>
			<div className="text-2xl max-w-full sm:max-w-xl mt-4">
				{!currentTag ? (
					<p>
						All{' '}
						<span className="font-bold xtext-white italic">
							{toWords(count)}
						</span>{' '}
						of my {getClassificationNoun(classification)}
					</p>
				) : (
					<p>
						{toCapitalizedWord(count)}{' '}
						<span className="font-bold text-white italic">{currentTag}</span>{' '}
						{singular(getClassificationNoun(classification), count)}
					</p>
				)}
			</div>
			<div>
				<p className="text-fg text-sm mb-1">or filter by </p>
				<div className="grid grid-flow-row gap-x-1.5 gap-y-1.5 grid-cols-[max-content_max-content_max-content] sm:grid-cols-[max-content_max-content_max-content_max-content]">
					{['All']
						.concat(tags)
						.sort()
						.map((t: string) => {
							if (t === currentTag || (t === 'All' && !currentTag)) {
								return null;
							}

							return (
								<Tag key={t} classification={classification}>
									{t}
								</Tag>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export { TagFilter };
