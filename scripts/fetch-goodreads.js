/**
 * Script to fetch books from Goodreads RSS feed and save to JSON
 * Run with: node scripts/fetch-goodreads.js
 * 
 * Goodreads RSS feeds:
 * - Currently reading: https://www.goodreads.com/review/list_rss/USER_ID?shelf=currently-reading
 * - Read: https://www.goodreads.com/review/list_rss/USER_ID?shelf=read
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Goodreads user ID (from https://www.goodreads.com/user/show/178378557-abhiram)
const GOODREADS_USER_ID = '178378557';

const RSS_URLS = {
	currentlyReading: `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`,
	read: `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read`,
};

/**
 * Parse XML string to extract book data
 * Simple regex-based parsing since we can't use DOMParser in Node without extra deps
 */
function parseBookFromXml(itemXml) {
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
	const author = getTagContent(itemXml, 'author_name');
	const link = getTagContent(itemXml, 'link');
	
	// Extract book cover - try large image first, then medium, then regular
	let cover = getTagContent(itemXml, 'book_large_image_url');
	if (!cover) {
		cover = getTagContent(itemXml, 'book_medium_image_url');
	}
	if (!cover) {
		cover = getTagContent(itemXml, 'book_image_url');
	}
	
	// Extract rating (user's rating, 0 if not rated)
	const ratingMatch = itemXml.match(/<user_rating>(\d+)<\/user_rating>/);
	const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 0;
	
	// Extract read date
	const readAtMatch = itemXml.match(/<user_read_at>([^<]*)<\/user_read_at>/);
	let dateRead = '';
	if (readAtMatch && readAtMatch[1]) {
		const dateStr = readAtMatch[1].trim();
		if (dateStr) {
			// Extract year from date string like "Sun, 15 Jan 2024 00:00:00 -0800"
			const yearMatch = dateStr.match(/\b(20\d{2})\b/);
			dateRead = yearMatch ? yearMatch[1] : '';
		}
	}

	return {
		title,
		author,
		cover,
		rating,
		link,
		...(dateRead && { dateRead }),
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
			const book = parseBookFromXml(match[1]);
			if (book.title && book.author) {
				items.push(book);
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
	console.log('📚 Fetching Goodreads books...\n');
	
	// Fetch both shelves
	const [currentlyReading, readBooks] = await Promise.all([
		fetchRssFeed(RSS_URLS.currentlyReading),
		fetchRssFeed(RSS_URLS.read),
	]);
	
	console.log(`\n✅ Found ${currentlyReading.length} books currently reading`);
	console.log(`✅ Found ${readBooks.length} books read\n`);
	
	// Prepare output data
	const booksData = {
		lastUpdated: new Date().toISOString(),
		currentlyReading,
		readBooks,
	};
	
	// Ensure data directory exists
	const outputPath = join(__dirname, '..', 'src', 'data', 'generated', 'books.json');
	const outputDir = dirname(outputPath);
	
	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}
	
	// Write to file
	writeFileSync(outputPath, JSON.stringify(booksData, null, '\t'));
	
	console.log(`📖 Saved to: src/data/generated/books.json`);
	console.log(`   - Currently reading: ${currentlyReading.length} books`);
	console.log(`   - Read: ${readBooks.length} books`);
	
	// Show preview
	if (currentlyReading.length > 0) {
		console.log('\n📕 Currently Reading:');
		currentlyReading.slice(0, 3).forEach(book => {
			console.log(`   - ${book.title} by ${book.author}`);
		});
	}
	
	if (readBooks.length > 0) {
		console.log('\n📗 Recently Read:');
		readBooks.slice(0, 3).forEach(book => {
			console.log(`   - ${book.title} by ${book.author} (${book.rating}⭐)`);
		});
	}
}

main().catch(console.error);
