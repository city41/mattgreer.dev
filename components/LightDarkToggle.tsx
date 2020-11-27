import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaMoon, FaRegSun } from 'react-icons/fa';

type LightDarkToggleProps = {
	className?: string;
};

const DARK_CLASS = 'forced-dark';
const LIGHT_CLASS = 'forced-light';

function LightDarkToggle({ className }: LightDarkToggleProps) {
	const [prefersLightMode, setPrefersLightMode] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		const queryList = window.matchMedia('(prefers-color-scheme: light)');

		function handleQueryChange() {
			// since the user changed their system pref,
			// remove any manual overrides they may have set earlier
			document.body.classList.remove(DARK_CLASS, LIGHT_CLASS);
			setPrefersLightMode(queryList.matches);
		}

		queryList.addEventListener('change', handleQueryChange);

		// call right away to sync initial state
		handleQueryChange();

		return () => queryList.removeEventListener('change', handleQueryChange);
	}, []);

	const handleClick = () => {
		const body = document.body;

		body.classList.remove(DARK_CLASS, LIGHT_CLASS);

		if (prefersLightMode) {
			body.classList.add(DARK_CLASS);
		} else {
			body.classList.add(LIGHT_CLASS);
		}

		setPrefersLightMode(body.classList.contains(LIGHT_CLASS));
	};

	// if this value never leaves null, then the user has JS disabled,
	// so in that case no need to render the toggle at all
	if (prefersLightMode === null) {
		return null;
	}

	return (
		<button
			className={clsx(className, 'text-2xl p-2 focus:outline-none')}
			onClick={handleClick}
			aria-label="color scheme toggle"
		>
			{prefersLightMode ? (
				<FaRegSun aria-label="light mode" />
			) : (
				<FaMoon aria-label="dark mode" />
			)}
		</button>
	);
}

export { LightDarkToggle };
