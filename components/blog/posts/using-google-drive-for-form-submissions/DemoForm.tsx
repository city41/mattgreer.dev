import React, { useState } from 'react';

const POST_URL =
	'https://docs.google.com/forms/u/0/d/e/1FAIpQLSegO8Qy4C6KrXa8x3wd7tW05xvDq6Qrv4_PNJOld_vIE3ipXA/formResponse';
const entryName = 'entry.249370976';

function DemoForm() {
	const [formData, setFormData] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.stopPropagation();
		e.preventDefault();

		const encodedValues = Object.keys(formData).map((key) => {
			return `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`;
		});

		try {
			await fetch(POST_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: encodedValues.join('&').replace(/%20/g, '+'),
			});
		} catch (e) {
		} finally {
			setHasSubmitted(true);
		}
	}

	if (hasSubmitted) {
		return <div>Thanks, I like {formData[entryName]} too!</div>;
	} else {
		return (
			<form method="post" onSubmit={handleSubmit} action={POST_URL}>
				<select
					name={entryName}
					onChange={(e) => {
						e.persist();
						setFormData((f) => ({ ...f, [entryName]: e.target.value }));
					}}
					value={formData[entryName]}
				>
					<option>-</option>
					<option value="Atom">Atom</option>
					<option value="Emacs">Emacs</option>
					<option value="Sublime">Sublime</option>
					<option value="Textmate">Textmate</option>
					<option value="vim">vim</option>
					<option value="VSCode">VSCode</option>
				</select>
				<input type="submit" value="submit" disabled={!formData[entryName]} />
			</form>
		);
	}
}

export { DemoForm };
