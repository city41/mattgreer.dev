const path = require('path');
const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx')({
	extension: /.mdx$/,
});

const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([[withOptimizedImages, {}], [withMDX]], {
	pageExtensions: ['tsx', 'mdx'],
	trailingSlash: true,
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
});
