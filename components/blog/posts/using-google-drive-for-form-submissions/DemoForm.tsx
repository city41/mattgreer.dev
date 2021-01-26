import React, { useState } from 'react';

const POST_URL =
	'https://docs.google.com/forms/u/0/d/e/1FAIpQLSegO8Qy4C6KrXa8x3wd7tW05xvDq6Qrv4_PNJOld_vIE3ipXA/formResponse';
const entryName = 'entry.249370976';

function DemoForm() {
	const [formData, setFormData] = useState({
		[entryName]: 'Atom',
	});
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
				mode: 'no-cors',
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

	let body;

	if (hasSubmitted) {
		body = (
			<>
				<p>Thanks, I like {formData[entryName]} too!</p>
				<a
					className="block text-blue-500 cursor-pointer"
					onClick={() => setHasSubmitted(false)}
				>
					show form again
				</a>
			</>
		);
	} else {
		body = (
			<form
				className="flex flex-col items-stretch w-full space-y-2"
				method="post"
				onSubmit={handleSubmit}
				action={POST_URL}
			>
				<label htmlFor="texteditor">your favorite editor</label>
				<select
					id="texteditor"
					className="p-1"
					name={entryName}
					onChange={(e) => {
						e.persist();
						setFormData((f) => ({ ...f, [entryName]: e.target.value }));
					}}
					value={formData[entryName]}
				>
					<option value="Atom">Atom</option>
					<option value="Emacs">Emacs</option>
					<option value="Sublime">Sublime</option>
					<option value="Textmate">Textmate</option>
					<option value="vim">vim</option>
					<option value="VSCode">VSCode</option>
				</select>
				<input className="p-1" type="submit" value="submit" />
			</form>
		);
	}

	return (
		<div className="my-4 p-4 border border-fg-fade w-full sm:w-64">{body}</div>
	);
}

export { DemoForm };
