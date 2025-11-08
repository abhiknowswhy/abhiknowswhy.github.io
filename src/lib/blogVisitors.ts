import type { BlogVisitor, SoloBlogPost, BlogSeries } from '../types/data';

/**
 * FilterVisitor - Filters blog items based on search term and selected tag
 */
export class FilterVisitor implements BlogVisitor<boolean> {
	searchTerm: string;
	selectedTag: string | null;

	constructor(searchTerm: string, selectedTag: string | null) {
		this.searchTerm = searchTerm;
		this.selectedTag = selectedTag;
	}

	matchesTag(tags: string[]): boolean {
		if (!this.selectedTag) return true;
		return tags.some(tag => tag.toLowerCase() === this.selectedTag?.toLowerCase());
	}

	visitSolo(post: SoloBlogPost): boolean {
		const textMatch =
			post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase());

		const tagMatch = this.matchesTag(post.tags);

		return textMatch && tagMatch;
	}

	visitSeries(series: BlogSeries): boolean {
		// Series matches if:
		// 1. Series metadata matches search/tag
		// 2. OR any post in the series matches
		const seriesTextMatch =
			series.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
			series.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
			series.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase());

		const seriesTagMatch = this.matchesTag(series.tags);
		const seriesMatches = seriesTextMatch && seriesTagMatch;

		const anyPostMatches = series.posts.some(post => this.visitSolo(post));

		return seriesMatches || anyPostMatches;
	}
}

/**
 * SearchVisitor - Searches across all blog item content
 */
export class SearchVisitor implements BlogVisitor<boolean> {
	query: string;

	constructor(query: string) {
		this.query = query;
	}

	visitSolo(post: SoloBlogPost): boolean {
		const queryLower = this.query.toLowerCase();
		return (
			post.title.toLowerCase().includes(queryLower) ||
			post.excerpt.toLowerCase().includes(queryLower) ||
			post.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
			post.authors.some(author => author.toLowerCase().includes(queryLower))
		);
	}

	visitSeries(series: BlogSeries): boolean {
		const queryLower = this.query.toLowerCase();
		return (
			series.title.toLowerCase().includes(queryLower) ||
			series.description.toLowerCase().includes(queryLower) ||
			series.excerpt.toLowerCase().includes(queryLower) ||
			series.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
			series.posts.some(post => this.visitSolo(post))
		);
	}
}

/**
 * FlattenVisitor - Flattens blog items to extract all solo posts
 */
export class FlattenVisitor implements BlogVisitor<SoloBlogPost[]> {
	visitSolo(post: SoloBlogPost): SoloBlogPost[] {
		return [post];
	}

	visitSeries(series: BlogSeries): SoloBlogPost[] {
		return series.posts;
	}
}

/**
 * AllTagsVisitor - Collects all unique tags from blog items
 */
export class AllTagsVisitor implements BlogVisitor<string[]> {
	visitSolo(post: SoloBlogPost): string[] {
		return post.tags;
	}

	visitSeries(series: BlogSeries): string[] {
		const allTags = new Set([...series.tags]);
		series.posts.forEach(post => {
			post.tags.forEach(tag => allTags.add(tag));
		});
		return Array.from(allTags);
	}
}

/**
 * CountVisitor - Counts posts/series
 */
export class CountVisitor implements BlogVisitor<number> {
	visitSolo(): number {
		return 1;
	}

	visitSeries(series: BlogSeries): number {
		return series.posts.length;
	}
}

/**
 * SeriesMetadataVisitor - Aggregates metadata from series children
 * Returns: { date, authors, readingTime, tags }
 */
export interface SeriesMetadata {
	date: string;
	authors: string[];
	readingTime: number;
	tags: string[];
}

export class SeriesMetadataVisitor implements BlogVisitor<SeriesMetadata> {
	visitSolo(post: SoloBlogPost): SeriesMetadata {
		return {
			date: post.date,
			authors: post.authors,
			readingTime: post.readingTime,
			tags: post.tags,
		};
	}

	visitSeries(series: BlogSeries): SeriesMetadata {
		// Always aggregate from children for consistency
		const allPosts = series.posts;
		if (allPosts.length === 0) {
			return {
				date: series.date || '',
				authors: [],
				readingTime: 0,
				tags: series.tags || [],
			};
		}

		// Date: minimum (earliest) date
		const dates = allPosts
			.map(post => new Date(post.date).getTime())
			.filter(d => !isNaN(d));
		const minDate = dates.length > 0 ? new Date(Math.min(...dates)).toISOString().split('T')[0] : series.date;

		// Authors: set union of all authors
		const authorsSet = new Set<string>();
		allPosts.forEach(post => {
			post.authors.forEach(author => authorsSet.add(author));
		});

		// Reading time: sum of all reading times
		const totalReadingTime = allPosts.reduce((sum, post) => sum + post.readingTime, 0);

		// Tags: set union of series tags and all post tags
		const tagsSet = new Set<string>();
		if (series.tags) {
			series.tags.forEach(tag => tagsSet.add(tag));
		}
		allPosts.forEach(post => {
			post.tags.forEach(tag => tagsSet.add(tag));
		});

		return {
			date: minDate,
			authors: Array.from(authorsSet),
			readingTime: totalReadingTime,
			tags: Array.from(tagsSet),
		};
	}
}

