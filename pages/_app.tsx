import React from 'react';
import { LightDarkToggle } from '../components/LightDarkToggle';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<LightDarkToggle className="fixed right-2 top-2 z-10" />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
