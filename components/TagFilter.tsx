import React from 'react';
import clsx from 'clsx';
import { Tag } from './Tag';
import { toWords } from 'number-to-words';

import styles from './TagFilter.module.css';

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
		<div className={clsx(className)}>
			<div className="text-2xl space-y-8 max-w-xl mt-4 text-white">
				{!currentTag ? (
					<p>
						All{' '}
						<span className="font-bold text-white italic">
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
			<p className="mt-16 sm:mt-12 mb-2 text-white text-sm">or filter by </p>
			<div className="flex flex-row flex-wrap">
				{['All']
					.concat(tags)
					.sort()
					.map((t: string) => {
						if (t === currentTag || (t === 'All' && !currentTag)) {
							return null;
						}

						return (
							<Tag
								key={t}
								classification={classification}
								className="mb-2 mr-2"
							>
								{t}
							</Tag>
						);
					})}
			</div>
		</div>
	);
}

export { TagFilter };
