const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');

const AUTHOR = {
	name: 'Matt Greer',
	email: 'matt.e.greer@gmail.com',
	link: 'https://mattgreer.dev',
};

const BLOG_DIR = path.join(__dirname, '../src/pages/blog');

function getDirs(root) {
	return fs
		.readdirSync(root)
		.filter((dir) => {
			const isArticleDirectory = fs
				.statSync(path.join(root, dir))
				.isDirectory();
			return (
				isArticleDirectory &&
				fs.existsSync(path.join(root, dir, 'meta.json')) &&
				!require(path.join(root, dir, 'meta.json')).draft
			);
		})
		.map((dir) => {
			return {
				root,
				dir,
			};
		});
}

const blogDirs = getDirs(BLOG_DIR);

const sortedArticleDirs = blogDirs.sort((a, b) => {
	const aMeta = require(path.join(a.root, a.dir, 'meta.json'));
	const bMeta = require(path.join(b.root, b.dir, 'meta.json'));

	const aDate = new Date(aMeta.date);
	const bDate = new Date(bMeta.date);

	return bDate.getTime() - aDate.getTime();
});

const feed = new Feed({
	title: 'Matt Greer',
	description: 'Mostly web dev and game dev related articles',
	id: 'https://mattgreer.dev',
	link: 'https://mattgreer.dev',
	language: 'en',
	image: 'https://mattgreer.dev/android-chrome-512x512.png',
	favicon: 'https://mattgreer.dev/favicon.ico',
	copyright: 'Copyright Matt Greer',
	feedLinks: {
		rss: 'https://mattgreer.dev/feed.xml',
	},
	author: AUTHOR,
});

sortedArticleDirs.forEach((a) => {
	const meta = require(path.join(a.root, a.dir, 'meta.json'));
	const url = `https://mattgreer.dev/blog/${a.dir}`;

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
