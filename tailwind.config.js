module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				focal: {
					fade: 'var(--color-focal-fade)',
					DEFAULT: 'var(--color-focal)',
					deep: 'var(--color-focal-deep)',
				},
				bg: {
					fade: 'var(--color-bg-fade)',
					DEFAULT: 'var(--color-bg)',
					deep: 'var(--color-bg-deep)',
				},
				fg: {
					fade: 'var(--color-fg-fade)',
					DEFAULT: 'var(--color-fg)',
					deep: 'var(--color-fg-deep)',
				},
				'bg-warning': 'var(--color-bg-warning)',
				'fg-warning': 'var(--color-fg-warning)',
				'bg-wisdom': 'var(--color-bg-wisdom)',
				'fg-wisdom': 'var(--color-fg-wisdom)',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['even'],
			margin: ['first'],
		},
	},
	plugins: [],
};
