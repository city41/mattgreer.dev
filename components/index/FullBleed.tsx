import React from 'react';
import clsx from 'clsx';

import { FullBleedScript } from './FullBleedCanvas';

type FullBleedProps = {
	className?: string;
};

function FullBleed({ className }: FullBleedProps) {
	return (
		<>
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `${FullBleedScript.toString()}; FullBleedCanvas();`,
				}}
			></script>
		</>
	);
}

export { FullBleed };
