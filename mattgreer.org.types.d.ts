type FeatureItemType = 'website' | 'technical article' | 'interactive article';

type FeatureItem = {
	title: string;
	imgFile: string;
	imgAlt: string;
	pixelateImage?: boolean;
	socialMediaFile: string;
	classification: 'articles' | 'projects';
	slug: string;
	url: string;
	date?: string;
	type?: FeatureItemType;
	description: string[];
	metaDescription: string;
	tags: string[];
	featureIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | -1;
	projectPagePriority: number;
};
