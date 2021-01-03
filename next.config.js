const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx')({
	extension: /.mdx$/,
});

const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins(
	[
		[
			withOptimizedImages,
			{
				inlineImageLimit: -1,
			},
		],
		[withMDX],
	],
	{
		pageExtensions: ['tsx', 'mdx'],
		trailingSlash: true,
		serverRuntimeConfig: {
			PROJECT_ROOT: __dirname,
		},
	}
);
