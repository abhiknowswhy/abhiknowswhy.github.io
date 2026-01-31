/**
 * Script to fetch articles from Medium RSS feed and save to JSON
 * Run with: node scripts/fetch-medium.js
 * 
 * Medium RSS feed: https://medium.com/feed/@username
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Medium username
const MEDIUM_USERNAME = 'abhiknowswhy';
const RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

/**
 * Parse XML string to extract article data
 */
function parseArticleFromXml(itemXml) {
	const getTagContent = (xml, tag) => {
		// Handle CDATA wrapped content
		const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
		const cdataMatch = xml.match(cdataRegex);
		if (cdataMatch) return cdataMatch[1].trim();
		
		// Handle plain content
		const plainRegex = new RegExp(`<${tag}>([^<]*)<\\/${tag}>`, 'i');
		const plainMatch = xml.match(plainRegex);
		return plainMatch ? plainMatch[1].trim() : '';
	};

	const title = getTagContent(itemXml, 'title');
	const link = getTagContent(itemXml, 'link');
	const pubDate = getTagContent(itemXml, 'pubDate');
	const creator = getTagContent(itemXml, 'dc:creator');
	
	// Extract content and get a clean excerpt
	let content = getTagContent(itemXml, 'content:encoded');
	
	// Try to extract the first image from content
	let coverImage = '';
	const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
	if (imgMatch) {
		coverImage = imgMatch[1];
	}
	
	// Clean HTML and create excerpt
	const cleanText = content
		.replace(/<[^>]+>/g, ' ')  // Remove HTML tags
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
	
	const excerpt = cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
	
	// Extract categories/tags
	const categories = [];
	const categoryRegex = /<category><!\[CDATA\[([^\]]+)\]\]><\/category>/gi;
	let match;
	while ((match = categoryRegex.exec(itemXml)) !== null) {
		categories.push(match[1]);
	}
	
	// Parse date
	const date = pubDate ? new Date(pubDate).toISOString().split('T')[0] : '';
	
	// Estimate read time (average 200 words per minute)
	const wordCount = cleanText.split(/\s+/).length;
	const readTime = Math.max(1, Math.ceil(wordCount / 200));

	return {
		title,
		link,
		date,
		author: creator || MEDIUM_USERNAME,
		excerpt,
		coverImage,
		tags: categories,
		readTime,
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
		
		// Extract all <item> elements
		const items = [];
		const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
		let match;
		
		while ((match = itemRegex.exec(xml)) !== null) {
			const article = parseArticleFromXml(match[1]);
			if (article.title && article.link) {
				items.push(article);
			}
		}
		
		return items;
	} catch (error) {
		console.error(`Error fetching ${url}:`, error.message);
		return [];
	}
}

/**
 * Main function
 */
async function main() {
	console.log('📝 Fetching Medium articles...\n');
	
	const articles = await fetchRssFeed(RSS_URL);
	
	console.log(`\n✅ Found ${articles.length} articles\n`);
	
	// Prepare output data
	const blogData = {
		lastUpdated: new Date().toISOString(),
		source: 'medium',
		username: MEDIUM_USERNAME,
		articles,
	};
	
	// Ensure data directory exists
	const outputPath = join(__dirname, '..', 'src', 'data', 'generated', 'medium-articles.json');
	const outputDir = dirname(outputPath);
	
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}
	
	// Write to file
	writeFileSync(outputPath, JSON.stringify(blogData, null, '\t'));
	
	console.log(`📄 Saved to: src/data/generated/medium-articles.json`);
	console.log(`   - Total articles: ${articles.length}`);
	
	// Show preview
	if (articles.length > 0) {
		console.log('\n📰 Recent Articles:');
		articles.slice(0, 5).forEach(article => {
			console.log(`   - ${article.title}`);
			console.log(`     ${article.date} • ${article.readTime} min read • ${article.tags.slice(0, 3).join(', ')}`);
		});
	}
}

main().catch(console.error);
