import { useEffect, useState } from 'react';
import Tex2SVG from 'react-hook-mathjax';

type BalatroMathJaxProps = {
	latex: string[];
};

function BalatroMathJax({ latex }: BalatroMathJaxProps) {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		<>
			{domLoaded && (
				<div className="text-2xl w-full flex flex-col gap-y-2 my-16 border border-fg-fade py-4 px-8 text-fg-deep">
					{latex.map((l) => {
						return <Tex2SVG display="block" latex={l} />;
					})}
				</div>
			)}
		</>
	);
}

export { BalatroMathJax };
