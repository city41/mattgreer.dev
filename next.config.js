const path = require('path');
const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx')({
	extension: /.mdx$/,
});

// const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins(
	[
		// [
		// 	withOptimizedImages,
		// 	{
		// 		inlineImageLimit: -1,
		// 	},
		// ],
		[withMDX],
	],
	{
		pageExtensions: ['tsx', 'mdx'],
		trailingSlash: true,
		serverRuntimeConfig: {
			PROJECT_ROOT: path.join(__dirname, 'src'),
			ROOT_DOMAIN: 'mattgreer.dev',
		},
	}
);
