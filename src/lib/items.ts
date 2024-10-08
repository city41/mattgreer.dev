import * as fs from 'fs';
import * as path from 'path';
import getConfig from 'next/config';

type GetAllArticleItemsOptions = {
	sortByDateDescending?: boolean;
};

type ImgExtension = 'jpg' | 'png' | 'svg';

function determineImage(dir: string, extensions: ImgExtension[]): string {
	const paths = extensions.map((ext) => {
		return path.join(dir, `feature.${ext}`);
	});
	const jpg = 'feature.jpg';
	const png = 'feature.png';
	const svg = 'feature.svg';

	const jpgPath = path.join(dir, jpg);
	const pngPath = path.join(dir, png);
	const svgPath = path.join(dir, svg);

	const pathIndex = paths.findIndex((p) => fs.existsSync(p));

	if (pathIndex === -1) {
		throw new Error(
			`determineImage: failed to find a feature image with extensions: ${extensions.join(
				', '
			)}`
		);
	}

	return `feature.${extensions[pathIndex]}`;
}

type MetaAndDescriptionData = {
	description: string[];
	metaDescription?: string;
};

function sortItemsByDateDescending(items: FeatureItem[]): FeatureItem[] {
	return items.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

/**
 * Often description (used on the website), and metaDescription (used in social media)
 * are the same, in that case, metaDescription is left blank, so fallback to description
 * in those cases
 */
function getMetaDescription(meta: MetaAndDescriptionData): string {
	if (meta.metaDescription) {
		return meta.metaDescription;
	} else {
		return meta.description.join(' ');
	}
}

function getItems(root: 'articles' | 'projects' | 'blog'): FeatureItem[] {
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

	return directories.reduce<FeatureItem[]>((buildingItems, directoryPath) => {
		const metaPath = path.join(directoryPath, 'meta.json');
		const metaSource = fs.readFileSync(metaPath).toString();
		const meta = JSON.parse(metaSource);

		if (meta.draft) {
			return buildingItems;
		} else {
			// it is important svg come first, as if feature.svg exists, feature.png should too
			const imgFile = determineImage(directoryPath, ['svg', 'png', 'jpg']);
			const socialMediaFile = path.join(directoryPath, 'twitter.png');

			return buildingItems.concat({
				...meta,
				classification: root,
				slug: path.basename(directoryPath),
				imgFile,
				socialMediaFile,
				metaDescription: getMetaDescription(meta),
			});
		}
	}, []);
}

function buildUrl(classification: string, slug: string): string {
	return `/${classification}/${slug}`;
}

export function getAllBlogItems(
	options: GetAllArticleItemsOptions = {}
): FeatureItem[] {
	const items = getItems('blog').map((i) => {
		return {
			...i,
			url: buildUrl('blog', i.slug),
		};
	});

	if (options.sortByDateDescending) {
		return sortItemsByDateDescending(items);
	} else {
		return items;
	}
}

export function getAllProjectItems(): FeatureItem[] {
	const projects = getItems('projects');

	return projects.sort((a, b) => {
		return a.projectPagePriority - b.projectPagePriority;
	});
}

export function getAllItems(): FeatureItem[] {
	return getAllProjectItems().concat(getAllBlogItems());
}
