import React from 'react';
import { NowPage } from '../components/now/NowPage';

export const config = {
	unstable_runtimeJS: false,
};

export default function NowNextPage() {
	return <NowPage />;
}
