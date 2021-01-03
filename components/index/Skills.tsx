import React from 'react';
import clsx from 'clsx';

import html5Svg from './html5.svg';
import tsLogoSvg from './tsLogo.svg';
import kitchenSinkSvg from './sink.svg';

type SkillsProps = {
	className?: string;
};

function Skill({
	img,
	imgAlt,
	children,
}: {
	img: string;
	imgAlt: string;
	children: string;
}) {
	const imgStyle = { backgroundImage: `url(${img})` };

	return (
		<div className="flex flex-col items-center w-full sm:w-1/3 max-w-6xl px-0 sm:px-8 mt-8 sm:mt-0">
			<div
				className={clsx('w-40 h-40 bg-cover bg-no-repeat bg-center', {
					'bg-green-500': !img,
				})}
				style={imgStyle}
				role="img"
				aria-label={imgAlt}
			/>
			<p className="mt-8 sm:text-2xl">{children}</p>
		</div>
	);
}

function Skills({ className }: SkillsProps) {
	return (
		<div className={className}>
			<div className="flex flex-col sm:flex-row justify-between items-start mx-8 sm:mx-16">
				<Skill img={html5Svg} imgAlt="HTML5 logo">
					Deep understanding of HTML, CSS and HTTP including the many features
					of HTML5 and CSS3.
				</Skill>
				<Skill img={tsLogoSvg} imgAlt="TypeScript logo">
					Expertise on all aspects of JavaScript. Extensive experience with
					TypeScript.
				</Skill>
				<Skill img={kitchenSinkSvg} imgAlt="Kitchen sink illustration">
					Polyglot experience in many environments from backend architecture to
					game dev.
				</Skill>
			</div>
		</div>
	);
}

export { Skills };
