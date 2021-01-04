function dateToHumanString(input: Date | number | string): string {
	const date = new Date(input);

	return date.toLocaleDateString('en-gb', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export { dateToHumanString };
