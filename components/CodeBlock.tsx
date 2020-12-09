import React from 'react';
import clsx from 'clsx';

import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

type CodeBlockProps = {
	className?: string;
	children: React.ReactNode;
};

function CodeBlock({ className, children }: CodeBlockProps) {
	const language = (className?.replace(/language-/, '') ??
		'javascript') as Language;

	return (
		<Highlight
			{...defaultProps}
			theme={theme}
			code={children as string}
			language={language}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={clsx(className, 'p-4 -mx-4 max-w-2xl')}
					style={{ ...style }}
				>
					{tokens.map((line, i, a) => {
						if (
							i === a.length - 1 &&
							line.every((token) => token.content.trim() === '')
						) {
							// don't render out blank last lines
							return null;
						}

						return (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						);
					})}
				</pre>
			)}
		</Highlight>
	);
}

export { CodeBlock };
