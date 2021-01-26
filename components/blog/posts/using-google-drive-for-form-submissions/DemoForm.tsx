import React, { useState } from 'react';

const POST_URL =
	'https://docs.google.com/forms/u/0/d/e/1FAIpQLSegO8Qy4C6KrXa8x3wd7tW05xvDq6Qrv4_PNJOld_vIE3ipXA/formResponse';

function DemoForm() {
	const [textEditor, setTextEditor] = useState<string | null>(null);
	const [hasSubmitted, setHasSubmitted] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.stopPropagation();
		e.preventDefault();

		const body = JSON.stringify({
			'entry.249370976': textEditor,
		});

		await fetch(POST_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		setHasSubmitted(true);
	}

	if (hasSubmitted) {
		return <div>Thanks, I like ${textEditor} too!</div>;
	} else {
		return (
			<form method="post" onSubmit={handleSubmit} action={POST_URL}>
				<select
					name="entry.249370976"
					onChange={(e) => setTextEditor(e.target.value)}
					value={textEditor}
				>
					<option value="atom">Atom</option>
					<option value="emacs">Emacs</option>
					<option value="sublime">Sublime</option>
					<option value="textmate">Textmate</option>
					<option value="vim">vim</option>
					<option value="VSCode">VSCode</option>
				</select>
				<input type="submit" value="submit" />
			</form>
		);
	}
}

export { DemoForm };
