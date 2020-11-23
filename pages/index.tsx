import React from 'react';
import Nav from '../components/nav';

export default function IndexPage() {
	return (
		<div>
			<Nav />
			<div className="py-20">
				<h1 className="text-8xl text-center text-gray-700 dark:text-gray-100">
					Next.js + Tailwind CSS 2.0
				</h1>
			</div>
		</div>
	);
}
