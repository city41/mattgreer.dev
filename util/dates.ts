/**
 * Note that Date#toLocaleDateString() cannot be used in Node easily.
 * The Node install needs to install the full ICU set, and getting that going
 * on vercel for example is probably more trouble than its worth. So this method
 * is handcoded a bit. Only need one date format, so not a huge deal
 */
function dateToHumanString(input: Date | number | string): string {
	const date = new Date(input);

	const month = date.toLocaleDateString('en-us', {
		month: 'short',
	});

	const day = date.toLocaleDateString('en-us', {
		day: 'numeric',
	});

	const year = date.toLocaleDateString('en-us', {
		year: 'numeric',
	});

	return `${day} ${month} ${year}`;
}

export { dateToHumanString };
