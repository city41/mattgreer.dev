import React from 'react';

type SectionProps = {
	className?: string;
	children: React.ReactNode;
};

function Section({ className, children }: SectionProps) {
	return <section className={className}>{children}</section>;
}

export { Section };
