import React from 'react';
import { Root } from '../layouts/Root';
import { HelpSection } from './HelpSection';

import laptopSvg from '../projects/laptop.svg';
import laptopPng from '../projects/laptop.png';
import { FocalColorLink } from '../FocalColorLink';

function HireMePage() {
	const headerContent = (
		<>
			<p className="text-white sm:mx-auto sm:max-w-2xl">
				After 10 years of working at companies including Netflix and Microsoft,
				I am now an independent engineer looking to help companies tackle
				challenging problems.
			</p>
		</>
	);

	return (
		<Root
			title="Let's work together"
			currentNav="/hire-me"
			img={laptopSvg}
			imgAlt="Illustration of a laptop"
			socialMediaImg={laptopPng}
			metaDescription="I'm an independent frontend engineer. Let's work together."
			navigation
			headerContent={headerContent}
			headerContentUnderTitle
		>
			<div className="mx-auto max-w-2xl">
				<h2 className="mb-8 sm:ml-4 text-4xl">I can help with...</h2>
				<div className="space-y-8">
					<HelpSection title="Consultation">
						<ul>
							<li>Application architecture, particularly on the frontend</li>
							<li>Build pipelines</li>
							<li>Developer productivity</li>
							<li>Improving legacy codebases</li>
						</ul>
						<p>
							I focus on pragmatic solutions that are neither over&mdash;nor
							under&mdash; engineered. I can help navigate frontend technology
							choices and find solid solutions that avoid hype, but also
							leverage recent innovations.
						</p>
					</HelpSection>
					<HelpSection title="Software engineering">
						<ul>
							<li>Add new features to existing projects</li>
							<li>
								Create new projects from scratch, including MVPs and prototypes
							</li>
							<li>Improve performance of websites</li>
							<li>
								Increase application reliability through test coverage and
								analytics
							</li>
							<li>Update older websites to modern CSS and HTML standards</li>
						</ul>
						<p>
							With my computer science background and experience across many
							domains, I create software that is reliable, performant, well
							documented, and easy to maintain.
						</p>
					</HelpSection>
					<HelpSection title="Design">
						<ul>
							<li>Implement design mock ups</li>
							<li>Adapt website templates to meet your needs</li>
							<li>Create clean and intuitive interfaces</li>
							<li>Style and component guides</li>
						</ul>
						<p>
							I have extensive experience working with designers, mock ups and
							templates. While I can't create a stunning design from scratch, I
							can create clean and intuitive interfaces ideal for applications
							such as internal tools or admin dashboards.
						</p>
					</HelpSection>
				</div>
				<p className="mt-16 sm:mx-4">
					My resume is{' '}
					<FocalColorLink href="/MattGreer_resume.pdf">
						viewable here
					</FocalColorLink>
					, and I can be reached by email at{' '}
					<FocalColorLink href="mailto:matt.e.greer@gmail.com">
						matt.e.greer@gmail.com
					</FocalColorLink>
					. I look forward to speaking with you.
				</p>
			</div>
		</Root>
	);
}

export { HireMePage };
