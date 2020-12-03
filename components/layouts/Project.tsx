import React from 'react';

type ProjectProps = {
	title: string;
	url: string;
};

function Project({ title, url }: ProjectProps) {
	return (
		<div>
			{title}, <a href={url}>{url}</a>
		</div>
	);
}

export { Project };
