/**
 * Script to fetch videos from YouTube RSS feed and save to JSON
 * Run with: node scripts/fetch-youtube.js
 * 
 * YouTube RSS feed: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// YouTube channel ID
const CHANNEL_ID = 'UC0LKmdHU5BqT5v7x2M_UM2g';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/**
 * Parse XML string to extract video data from an <entry> element
 */
function parseVideoFromXml(entryXml) {
	const getTagContent = (xml, tag) => {
		const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
		const match = xml.match(regex);
		return match ? match[1].trim() : '';
	};

	const getAttr = (xml, tag, attr) => {
		const regex = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["']`, 'i');
		const match = xml.match(regex);
		return match ? match[1] : '';
	};

	const videoId = getTagContent(entryXml, 'yt:videoId');
	const title = getTagContent(entryXml, 'title');
	const published = getTagContent(entryXml, 'published');
	const link = getAttr(entryXml, 'link', 'href');

	// Extract media:group content
	const mediaGroupMatch = entryXml.match(/<media:group>([\s\S]*?)<\/media:group>/i);
	const mediaGroup = mediaGroupMatch ? mediaGroupMatch[1] : '';

	const description = getTagContent(mediaGroup, 'media:description');
	const thumbnail = getAttr(mediaGroup, 'media:thumbnail', 'url');

	// Truncate description to 200 chars
	const truncatedDescription = description.length > 200
		? description.substring(0, 200) + '...'
		: description;

	return {
		videoId,
		title,
		thumbnail: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
		publishedAt: published ? new Date(published).toISOString() : '',
		description: truncatedDescription,
		link: link || `https://www.youtube.com/watch?v=${videoId}`,
	};
}

/**
 * Fetch and parse RSS feed
 */
async function fetchRssFeed(url) {
	try {
		console.log(`Fetching: ${url}`);
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const xml = await response.text();

		// Extract all <entry> elements
		const videos = [];
		const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
		let match;

		while ((match = entryRegex.exec(xml)) !== null) {
			const video = parseVideoFromXml(match[1]);
			if (video.videoId && video.title) {
				videos.push(video);
			}
		}

		return videos;
	} catch (error) {
		console.error(`Error fetching ${url}:`, error.message);
		return [];
	}
}

/**
 * Main function
 */
async function main() {
	console.log('🎬 Fetching YouTube videos...\n');

	const videos = await fetchRssFeed(RSS_URL);

	console.log(`\n✅ Found ${videos.length} videos\n`);

	// Prepare output data
	const videoData = {
		lastUpdated: new Date().toISOString(),
		source: 'youtube',
		channelId: CHANNEL_ID,
		videos,
	};

	// Ensure data directory exists
	const outputPath = join(__dirname, '..', 'src', 'data', 'generated', 'youtube-videos.json');
	const outputDir = dirname(outputPath);

	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	// Write to file
	writeFileSync(outputPath, JSON.stringify(videoData, null, '\t'));

	console.log(`📄 Saved to: src/data/generated/youtube-videos.json`);
	console.log(`   - Total videos: ${videos.length}`);

	// Show preview
	if (videos.length > 0) {
		console.log('\n🎥 Recent Videos:');
		videos.slice(0, 5).forEach(video => {
			console.log(`   - ${video.title}`);
			console.log(`     ${video.publishedAt.split('T')[0]}`);
		});
	}
}

main().catch(console.error);
