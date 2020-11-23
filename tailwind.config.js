module.exports = {
	purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['sans-serif'],
		},
		extend: {
			colors: {
				'accent-1': '#333',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
