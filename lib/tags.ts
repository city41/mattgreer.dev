import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config';

function getTags(root: 'articles' | 'projects'): TagLabel[] {
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

	const tags = directories.reduce<TagLabel[]>((buildingTags, directory) => {
		const metaPath = path.join(directory, 'meta.json');
		const metaSource = fs.readFileSync(metaPath).toString();
		const pageMeta = JSON.parse(metaSource);

		if (pageMeta.draft) {
			return buildingTags;
		} else {
			return buildingTags.concat(pageMeta.tags);
		}
	}, []);

	return tags;
}

export function getAllProjectTags(): TagLabel[] {
	return getTags('projects');
}

export function getAllArticleTags(): TagLabel[] {
	return getTags('articles');
}
