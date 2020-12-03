import React from 'react';
import { LightDarkToggle } from '../components/LightDarkToggle';
import { Footer } from '../components/Footer';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<LightDarkToggle className="fixed right-1 top-1 z-10" />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
