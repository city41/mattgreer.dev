import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config';

function determineImage(dir: string): string {
	const jpg = 'feature.jpg';
	const png = 'feature.png';

	const jpgPath = path.join(dir, jpg);
	const pngPath = path.join(dir, png);

	if (fs.existsSync(jpgPath)) {
		return jpg;
	}

	if (fs.existsSync(pngPath)) {
		return png;
	}

	return '';
}

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

	return directories.reduce<PortfolioItem[]>((buildingItems, directoryPath) => {
		const metaPath = path.join(directoryPath, 'meta.json');
		const metaSource = fs.readFileSync(metaPath).toString();
		const meta = JSON.parse(metaSource);

		if (meta.draft) {
			return buildingItems;
		} else {
			const imgFile = determineImage(directoryPath);

			return buildingItems.concat({
				...meta,
				classification: root,
				slug: path.basename(directoryPath),
				imgFile,
			});
		}
	}, []);
}

export function getAllArticleItems(): PortfolioItem[] {
	return getItems('articles');
}

export function getAllProjectItems(): PortfolioItem[] {
	return getItems('projects');
}

export function getAllItems(): PortfolioItem[] {
	return getAllArticleItems().concat(getAllProjectItems());
}
