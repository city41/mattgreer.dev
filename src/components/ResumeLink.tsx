import React from 'react';
import { FocalColorLink } from './FocalColorLink';

type ResumeLinkProps = {
	className?: string;
	el?: React.ElementType;
	children?: React.ReactNode;
};

function ResumeLink({
	className,
	el = FocalColorLink,
	children = 'resume',
}: ResumeLinkProps) {
	const El = el;

	return (
		<El className={className} href="/MattGreer_resume.pdf">
			{children}
		</El>
	);
}

export { ResumeLink };
