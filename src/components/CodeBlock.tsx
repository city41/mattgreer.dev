import React from 'react';
import clsx from 'clsx';
import Prism from 'prism-react-renderer/prism';

import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-clojure');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-lua');

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
				<code
					className={clsx(
						className,
						'block p-4 my-8 sm:my-12 max-w-2xl text-sm sm:text-base'
					)}
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
								{line.map((token, key) => {
									// force tabbing to show up without using a <pre>
									// <pre> is bad as it doesn't line wrap on narrow screens
									// this really hacky approach enables the indenting to show up using nbsp,
									// but also allows the spaces to wrap using <wbr>
									// NOTE: using padding/margin visually gets the same result and feels less hacky,
									// but the user cannot copy/paste the code correctly

									const content = token.content.replace(/ /g, '&nbsp;<wbr>');
									token.content = '';
									const tokenProps = getTokenProps({ token, key });
									delete tokenProps.children;

									return (
										<span
											key={key}
											{...tokenProps}
											dangerouslySetInnerHTML={{ __html: content }}
										/>
									);
								})}
							</div>
						);
					})}
				</code>
			)}
		</Highlight>
	);
}

export { CodeBlock };
