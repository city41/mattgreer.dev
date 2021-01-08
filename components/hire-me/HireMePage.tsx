import React from 'react';
import { Root } from '../layouts/Root';
import { HelpSection } from './HelpSection';

import laptopSvg from '../articles/laptop.svg';
import { FocalColorLink } from '../FocalColorLink';

function HireMePage() {
	const headerContent = (
		<p className="text-white sm:mx-auto sm:max-w-2xl">
			I am an experienced senior engineer with a primary focus on web
			development.
		</p>
	);

	return (
		<Root
			title="Let's work together"
			currentNav="/hire-me"
			img={laptopSvg}
			imgAlt="Illustration of a laptop"
			metaDescription=""
			navigation
			headerContent={headerContent}
			headerContentUnderTitle
		>
			<div className="mx-auto max-w-2xl">
				<p className="my-8 sm:mx-4">
					I have worked as a full time employee for companies such as Netflix
					and Microsoft, and have gained a lot of pragmatic experience over my
					career solving tough problems.
				</p>
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
							I focus on pragmatic solutions that are neither over nor under
							engineered. I can help navigate frontend technology choices and
							find solid solutions that avoid hype, but also take advantage of
							recent innovations.
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
					</HelpSection>
					<HelpSection title="Design">
						<ul>
							<li>Implement design mock ups</li>
							<li>Adapt website templates to meet your needs</li>
							<li>Create clean and intuitive interfaces</li>
							<li>Style and component guides</li>
						</ul>
						<p>
							I am not a designer, so I am not able to create designs from
							scratch. But I have extensive experience working with designers,
							mock ups and templates. I can implement clean and intuitive
							interfaces ideal for applications such as internal tools or admin
							panels.
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
