import React from 'react';
import { AboutPage } from '../components/about/AboutPage';

export const config = {
	unstable_runtimeJS: false,
};

export default function AboutNextPage() {
	return <AboutPage />;
}
