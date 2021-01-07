const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');

const AUTHOR = {
	name: 'Matt Greer',
	email: 'matt.e.greer@gmail.com',
	link: 'https://mattgreer.dev',
};

const ARTICLE_DIR = path.join(__dirname, '../pages/articles');

const articleDirs = fs.readdirSync(ARTICLE_DIR).filter((dir) => {
	const isArticleDirectory = fs
		.statSync(path.join(ARTICLE_DIR, dir))
		.isDirectory();
	return (
		isArticleDirectory &&
		fs.existsSync(path.join(ARTICLE_DIR, dir, 'meta.json')) &&
		!require(path.join(ARTICLE_DIR, dir, 'meta.json')).draft
	);
});

const sortedArticleDirs = articleDirs.sort((a, b) => {
	const aMeta = require(path.join(ARTICLE_DIR, a, 'meta.json'));
	const bMeta = require(path.join(ARTICLE_DIR, b, 'meta.json'));

	const aDate = new Date(aMeta.date);
	const bDate = new Date(bMeta.date);

	return bDate.getTime() - aDate.getTime();
});

const mostRecentArticleDate = require(path.join(
	ARTICLE_DIR,
	sortedArticleDirs[0],
	'meta.json'
)).date;

const feed = new Feed({
	title: "Matt Greer's blog",
	description: 'Mostly web dev related articles',
	id: 'https://mattgreer.dev',
	link: 'https://mattgreer.dev',
	language: 'en',
	image: 'http://example.com/image.png',
	favicon: 'https://mattgreer.dev/favicon.ico',
	copyright: 'Copyright Matt Greer',
	updated: new Date(mostRecentArticleDate),
	feedLinks: {
		rss: 'https://mattgreer.dev/feed.xml',
	},
	author: AUTHOR,
});

sortedArticleDirs.forEach((articleDir) => {
	const meta = require(path.join(ARTICLE_DIR, articleDir, 'meta.json'));
	const url = `https://mattgreer.dev/articles/${articleDir}`;

	feed.addItem({
		title: meta.title,
		id: url,
		link: url,
		description: meta.description.join(' '),
		author: [AUTHOR],
		date: new Date(meta.date),
		// TODO: get feature.png somehow...
		///image: `https://mattgreer.dev/`
	});
});

fs.writeFileSync('public/feed.xml', feed.rss2());
