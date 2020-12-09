import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

type FiddleProps = {
	className?: string;
	children: string;
};

function Fiddle({ className, children }: FiddleProps) {
	return (
		<Link href={`https://jsfiddle.net/${children}`} passHref>
			<a
				className="inline-flex flex-row items-center bg-focal text-white px-4 py-2 my-2"
				rel="noopener"
				target="_blank"
			>
				JS Fiddle
				<FiExternalLink className="ml-2" />
			</a>
		</Link>
	);
}

export { Fiddle };
