import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { FiMoon, FiSun } from 'react-icons/fi';

type LightDarkToggleProps = {
	className?: string;
};

const BUTTON_ID = 'LightDarkToggleButton';
const DARK_CLASS = 'forcedDark';
const LIGHT_CLASS = 'forcedLight';

function LightDarkToggle({ className }: LightDarkToggleProps) {
	// useEffect(() => {
	// 	const queryList = window.matchMedia('(prefers-color-scheme: light)');
	//
	// 	function handleQueryChange() {
	// 		// since the user changed their system pref,
	// 		// remove any manual overrides they may have set earlier
	// 		document.body.classList.remove(DARK_CLASS, LIGHT_CLASS);
	// 		setPrefersLightMode(queryList.matches);
	// 	}
	//
	// 	queryList.addEventListener('change', handleQueryChange);
	//
	// 	// call right away to sync initial state
	// 	handleQueryChange();
	//
	// 	return () => queryList.removeEventListener('change', handleQueryChange);
	// }, []);

	const handleClick = () => {
		const body = document.body;

		body.classList.remove(DARK_CLASS, LIGHT_CLASS);

		const prefersLightMode = localStorage.prefersLightMode === 'true';

		if (prefersLightMode) {
			console.log('going dark');
			body.classList.add(DARK_CLASS);
			localStorage.prefersLightMode = 'false';
		} else {
			console.log('going light');
			body.classList.add(LIGHT_CLASS);
			localStorage.prefersLightMode = 'true';
		}
	};

	return (
		<>
			<Head>
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
DARK_CLASS = '${DARK_CLASS}';
LIGHT_CLASS = '${LIGHT_CLASS}';
							
__queryList = window.matchMedia('(prefers-color-scheme: light)');

if (typeof localStorage.prefersLightMode !== 'string') {
	localStorage.prefersLightMode = __queryList.matches.toString();
}

function onDomContentLoaded() {
	var lightDarkToggleButton = document.getElementById('${BUTTON_ID}');
	lightDarkToggleButton.addEventListener('click', ${handleClick.toString()});
	
	document.removeEventListener('DOMContentLoaded', onDomContentLoaded);
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
							`,
					}}
				></script>
			</Head>
			<button
				id={BUTTON_ID}
				className={clsx(
					className,
					'p-2 flex flex-row items-center text-fg-fade'
				)}
				aria-label="color scheme toggle"
			>
				<div id="prefersLightModeDisplay">
					<FiSun className="text-2xl mr-2" aria-label="light mode" />
					light theme
				</div>
				<div id="prefersDarkModeDisplay">
					<FiMoon className="text-2xl mr-2" aria-label="dark mode" />
					dark theme
				</div>
			</button>
		</>
	);
}

export { LightDarkToggle };
