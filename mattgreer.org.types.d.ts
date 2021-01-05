type TagLabel =
	| 'All'
	| 'JavaScript'
	| 'React'
	| 'TypeScript'
	| 'Redux'
	| 'NodeJS'
	| 'Godot'
	| 'wasm';

type Article = {
	name: string;
	url: string;
};

type PortfolioItemType =
	| 'website'
	| 'technical article'
	| 'interactive article';

type PortfolioItem = {
	title: string;
	imgFile: string;
	imgAlt: string;
	pixelateImage?: boolean;
	socialMediaFile: string;
	slug: string;
	classification: 'articles' | 'projects';
	date?: string;
	type?: PortfolioItemType;
	description: string[];
	metaDescription: string;
	tags: TagLabel[];
	featureIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | -1;
};
