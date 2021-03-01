import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { FiMoon, FiSun } from 'react-icons/fi';

type LightDarkToggleProps = {
	className?: string;
};

const BUTTON_ID = 'LightDarkToggleButton';

function LightDarkToggle({ className }: LightDarkToggleProps) {
	return (
		<>
			<Head>
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
var DARK_CLASS = 'forcedDark';
var LIGHT_CLASS = 'forcedLight';
							
// purposely global so things don't blow up during HMR in dev mode
__queryList = window.matchMedia('(prefers-color-scheme: light)');

if (typeof localStorage.prefersLightMode !== 'string') {
	localStorage.prefersLightMode = __queryList.matches.toString();
}

function setColorScheme() {
	document.body.classList.remove(DARK_CLASS, LIGHT_CLASS);
	
	var lightDarkToggleButton = document.getElementById('${BUTTON_ID}');
	var lightLabel = lightDarkToggleButton.querySelector('#lightLabel');
	var darkLabel = lightDarkToggleButton.querySelector('#darkLabel');
	
	if (localStorage.prefersLightMode === 'true') {
		lightLabel.classList.remove('hidden');
		darkLabel.classList.add('hidden');
		document.body.classList.add(LIGHT_CLASS);
	} else {
		lightLabel.classList.add('hidden');
		darkLabel.classList.remove('hidden');
		document.body.classList.add(DARK_CLASS);
	}
}
	
function handleButtonClick() {
	const prefersLightMode = localStorage.prefersLightMode === 'true';
	localStorage.prefersLightMode = (!prefersLightMode).toString();
	setColorScheme();
};
	
function handleQueryChange() {
	localStorage.prefersLightMode = __queryList.matches.toString();
	setColorScheme();
}
	
function onDomContentLoaded() {
	var lightDarkToggleButton = document.getElementById('${BUTTON_ID}');
	lightDarkToggleButton.addEventListener('click', handleButtonClick);
	
	var lightLabel = lightDarkToggleButton.querySelector('#lightLabel');
	var darkLabel = lightDarkToggleButton.querySelector('#darkLabel');
	
	setColorScheme();
	
	setTimeout(function() {
		lightDarkToggleButton.classList.remove('invisible');
		lightDarkToggleButton.disabled = false;
	}, 1);
	
	__queryList.addEventListener('change', handleQueryChange);
	
	document.removeEventListener('DOMContentLoaded', onDomContentLoaded);
}

if (typeof window !== 'undefined') {
	document.addEventListener('DOMContentLoaded', onDomContentLoaded);
}
							`,
					}}
				></script>
			</Head>
			<button
				id={BUTTON_ID}
				className={clsx(
					className,
					'invisible text-fg-fade hover:bg-bg rounded'
				)}
				style={{ outline: 'none' }}
				aria-label="color scheme toggle"
				disabled
			>
				<div
					id="lightLabel"
					className="hidden p-2 flex flex-row items-center text-fg"
				>
					<FiMoon
						className="text-2xl mr-2 hidden sm:block"
						aria-label="dark mode"
					/>
					switch to dark theme
				</div>
				<div
					id="darkLabel"
					className="hidden p-2 flex flex-row items-center text-fg"
				>
					<FiSun
						className="text-2xl mr-2 hidden sm:block"
						aria-label="light mode"
					/>
					switch to light theme
				</div>
			</button>
		</>
	);
}

export { LightDarkToggle };
