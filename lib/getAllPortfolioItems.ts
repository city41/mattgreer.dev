import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config';

function getItems(root: 'articles' | 'projects'): PortfolioItem[] {
	const pagesPath = path.resolve(
		getConfig().serverRuntimeConfig.PROJECT_ROOT,
		'pages',
		root
	);

	const directories = fs
		.readdirSync(pagesPath)
		.reduce<string[]>((building, entry) => {
			const childPath = path.join(pagesPath, entry);

			if (fs.statSync(childPath).isDirectory()) {
				return building.concat(childPath);
			} else {
				return building;
			}
		}, []);

	return directories.map((directoryPath) => {
		const metaPath = path.join(directoryPath, 'meta.json');
		const metaSource = fs.readFileSync(metaPath).toString();
		const meta = JSON.parse(metaSource);

		return {
			...meta,
			classification: root,
			slug: path.basename(directoryPath),
		};
	});
}

export function getAllPortfolioItems(): PortfolioItem[] {
	const articleItems = getItems('articles');
	const projectItems = getItems('projects');

	return articleItems.concat(projectItems);
}
