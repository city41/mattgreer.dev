import { useEffect, useState } from 'react';
import Tex2SVG from 'react-hook-mathjax';

type BalatroMathJaxProps = {
	latex: string | string[];
};

function BalatroMathJax({ latex }: BalatroMathJaxProps) {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		<>
			{domLoaded && Array.isArray(latex) ? (
				<div className="text-xl w-full flex flex-col gap-y-2 my-16 border border-fg-fade py-4 px-8 text-fg-deep">
					{latex.map((l) => {
						return <Tex2SVG display="block" latex={l} />;
					})}
				</div>
			) : (
				<Tex2SVG
					class="inline-block text-xl text-fg-deep"
					latex={latex as string}
				/>
			)}
		</>
	);
}

export { BalatroMathJax };
