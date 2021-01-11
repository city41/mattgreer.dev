const { existsSync, readdirSync, writeFileSync } = require('fs');
const { join } = require('path');
const { createCanvas, Image: CanvasImage } = require('canvas');

const WIDTH = 1000;
const HEIGHT = 500;

const ARTICLE_ROOT = join(__dirname, '../pages/articles');
const FEATURE_IMAGES = ['feature.svg', 'feature.png', 'feature.jpg'];

const TEMPLATE_IMAGE_PATH = join(__dirname, 'twitterTemplate.svg');
const templateImage = new CanvasImage();
templateImage.src = TEMPLATE_IMAGE_PATH;

function getLines(ctx, text, maxWidth) {
	const words = text.split(' ');
	const lines = [];
	let currentLine = words[0];

	for (let i = 1; i < words.length; i++) {
		const word = words[i];
		const width = ctx.measureText(currentLine + ' ' + word).width;
		if (width < maxWidth) {
			currentLine += ' ' + word;
		} else {
			lines.push(currentLine);
			currentLine = word;
		}
	}
	lines.push(currentLine);
	return lines;
}

function drawTitle(context, title) {
	context.fillStyle = 'white';
	const fontSize = title.length > 60 ? 36 : 48;
	const lineHeight = fontSize * 1.2;
	context.font = `${fontSize}px sans-serif`;

	const maxWidth = 500;
	const lines = getLines(context, title, maxWidth);

	const x = 50;
	const y = HEIGHT / 2 - (lines.length * lineHeight) / 2;

	lines.forEach((line, i) => {
		context.fillText(line, x, y + i * lineHeight);
	});
}

function generateTwitterImage(articleDir) {
	const featureImageFile = FEATURE_IMAGES.find((fi) =>
		existsSync(join(articleDir, fi))
	);

	if (!featureImageFile) {
		throw new Error(`${articleDir} has no feature image`);
	}

	const featureImagePath = join(articleDir, featureImageFile);

	const featureImage = new CanvasImage();
	featureImage.src = featureImagePath;

	if (featureImage.width !== featureImage.height) {
		throw new Error(`${articleDir} feature image is not square`);
	}

	const canvas = createCanvas(WIDTH, HEIGHT);
	const context = canvas.getContext('2d');

	context.drawImage(
		featureImage,
		0,
		0,
		featureImage.width,
		featureImage.height,
		490,
		-10,
		520,
		520
	);

	context.drawImage(
		templateImage,
		0,
		0,
		templateImage.width,
		templateImage.height,
		0,
		0,
		canvas.width,
		canvas.height
	);

	const articleTitle = require(join(articleDir, 'meta.json')).title;
	drawTitle(context, articleTitle);

	const buffer = canvas.toBuffer();
	writeFileSync(join(articleDir, 'twitter.png'), buffer);
}

function main() {
	const articleDirs = readdirSync(ARTICLE_ROOT).filter((articleDir) => {
		return existsSync(join(ARTICLE_ROOT, articleDir, 'meta.json'));
	});

	articleDirs.forEach((articleDir) =>
		generateTwitterImage(join(ARTICLE_ROOT, articleDir))
	);
}

main();
