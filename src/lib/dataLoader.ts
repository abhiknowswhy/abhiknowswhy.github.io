import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import libraryData from '../data/library.json';
import blogData from '../data/blog.json';

import type {
	PersonalData,
	ProjectsData,
	Project,
	LibraryData,
	Book,
	BlogData,
	BlogPost,
	BlogItem,
	SoloBlogPost,
	BlogSeries,
	BlogVisitor
} from '../types/data';

// Personal Data
export const getPersonalData = (): PersonalData => personalData as PersonalData;

export const getProfile = () => personalData.profile;
export const getSocialLinks = () => personalData.social;
export const getExperience = () => personalData.experience;
export const getEducation = () => personalData.education;
export const getCertifications = () => personalData.certifications;

// Projects Data
export const getProjectsData = (): ProjectsData => projectsData as ProjectsData;

export const getFeaturedProjects = (): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => 
		projectsData.featured.includes(project.id)
	);
};

export const getProjectById = (id: string): Project | undefined => {
	return (projectsData as ProjectsData).projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => 
		project.category === category
	);
};

export const getProjectsByTag = (tag: string): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => 
		project.tags.includes(tag)
	);
};

export const getProjectsByStatus = (status: string): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => 
		project.status === status
	);
};

export const getAllProjectCategories = (): string[] => {
	return projectsData.categories;
};

export const getAllProjectTags = (): string[] => {
	const allTags = (projectsData as ProjectsData).projects.reduce((tags, project) => {
		return [...tags, ...project.tags];
	}, [] as string[]);
	return [...new Set(allTags)];
};

// Library Data
export const getLibraryData = (): LibraryData => libraryData as LibraryData;

export const getCurrentlyReadingBooks = (): Book[] => {
	return (libraryData as LibraryData).books.filter(book => 
		libraryData.currentlyReading.includes(book.id)
	);
};

export const getFavoriteBooks = (): Book[] => {
	return (libraryData as LibraryData).books.filter(book => book.favorite);
};

export const getBookById = (id: string): Book | undefined => {
	return (libraryData as LibraryData).books.find(book => book.id === id);
};

export const getBooksByGenre = (genre: string): Book[] => {
	return (libraryData as LibraryData).books.filter(book => 
		book.genre.includes(genre)
	);
};

export const getBooksByStatus = (status: string): Book[] => {
	return (libraryData as LibraryData).books.filter(book => 
		book.readingStatus === status
	);
};

export const getBooksByRating = (minRating: number): Book[] => {
	return (libraryData as LibraryData).books.filter(book => 
		book.rating && book.rating >= minRating
	);
};

export const getReadingStats = () => {
	const books = (libraryData as LibraryData).books;
	const readBooks = books.filter(book => book.readingStatus === 'read');
	const currentlyReading = books.filter(book => book.readingStatus === 'currently-reading');
	const wantToRead = books.filter(book => book.readingStatus === 'want-to-read');
  
	const totalPages = readBooks.reduce((total, book) => {
		return total + (book.pageCount || 0);
	}, 0);
  
	const averageRating = readBooks.reduce((total, book) => {
		return total + (book.rating || 0);
	}, 0) / readBooks.length;
  
	const genreCounts = books.reduce((counts, book) => {
		book.genre.forEach(genre => {
			counts[genre] = (counts[genre] || 0) + 1;
		});
		return counts;
	}, {} as Record<string, number>);
  
	const topGenres = Object.entries(genreCounts)
		.sort(([,a], [,b]) => b - a)
		.slice(0, 5)
		.map(([genre]) => genre);
  
	return {
		totalBooks: books.length,
		readBooks: readBooks.length,
		currentlyReading: currentlyReading.length,
		wantToRead: wantToRead.length,
		totalPages,
		averageRating: Number(averageRating.toFixed(1)),
		topGenres,
		readingGoals: libraryData.readingGoals,
		favoriteGenres: libraryData.favoriteGenres
	};
};

// Search functionality
export const searchContent = (query: string, types: string[] = ['projects', 'books']) => {
	const results = [];
	const lowerQuery = query.toLowerCase();
  
	if (types.includes('projects')) {
		const projectResults = (projectsData as ProjectsData).projects
			.filter(project => 
				project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
			)
			.map(project => ({
				id: project.id,
				title: project.title,
				type: 'project' as const,
				excerpt: project.description,
				url: `/projects/${project.id}`,
				relevance: calculateRelevance(project.title + ' ' + project.description, query)
			}));
    
		results.push(...projectResults);
	}
  
	if (types.includes('books')) {
		const bookResults = (libraryData as LibraryData).books
			.filter(book => 
				book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.some(genre => genre.toLowerCase().includes(lowerQuery)) ||
        (book.review && book.review.toLowerCase().includes(lowerQuery))
			)
			.map(book => ({
				id: book.id,
				title: book.title,
				type: 'book' as const,
				excerpt: `${book.author} - ${book.genre.join(', ')}`,
				url: `/library/${book.id}`,
				relevance: calculateRelevance(book.title + ' ' + book.author, query)
			}));
    
		results.push(...bookResults);
	}
  
	return results.sort((a, b) => b.relevance - a.relevance);
};

// Helper function to calculate search relevance
function calculateRelevance(text: string, query: string): number {
	const lowerText = text.toLowerCase();
	const lowerQuery = query.toLowerCase();
  
	let score = 0;
  
	// Exact match gets highest score
	if (lowerText.includes(lowerQuery)) {
		score += 10;
	}
  
	// Word matches
	const words = lowerQuery.split(' ');
	words.forEach(word => {
		if (lowerText.includes(word)) {
			score += 5;
		}
	});
  
	// Character similarity (simple implementation)
	const similarity = jaccardSimilarity(lowerText, lowerQuery);
	score += similarity * 2;
  
	return score;
}

// Simple Jaccard similarity for character n-grams
function jaccardSimilarity(str1: string, str2: string, n = 2): number {
	const ngrams1 = new Set();
	const ngrams2 = new Set();
  
	for (let i = 0; i <= str1.length - n; i++) {
		ngrams1.add(str1.substr(i, n));
	}
  
	for (let i = 0; i <= str2.length - n; i++) {
		ngrams2.add(str2.substr(i, n));
	}
  
	const intersection = new Set([...ngrams1].filter(x => ngrams2.has(x)));
	const union = new Set([...ngrams1, ...ngrams2]);
  
	return intersection.size / union.size;
}

// Utility functions for data transformation
export const getRecentProjects = (limit = 3): Project[] => {
	return (projectsData as ProjectsData).projects
		.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
		.slice(0, limit);
};

export const getCompletedProjects = (): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => project.status === 'completed');
};

export const getInProgressProjects = (): Project[] => {
	return (projectsData as ProjectsData).projects.filter(project => project.status === 'in-progress');
};

export const getRecentlyReadBooks = (limit = 3): Book[] => {
	return (libraryData as LibraryData).books
		.filter(book => book.readingStatus === 'read' && book.finishDate)
		.sort((a, b) => new Date(b.finishDate!).getTime() - new Date(a.finishDate!).getTime())
		.slice(0, limit);
};

// Blog Data
export const getBlogData = (): BlogData => {
	return blogData as unknown as BlogData;
};

/**
 * Deserialize blog items from JSON and add visitor pattern support
 */
function deserializeBlogItem(item: Record<string, unknown>): BlogItem {
	if (item.type === 'series') {
		const series: BlogSeries = {
			id: item.id as string,
			type: 'series',
			title: item.title as string,
			description: item.description as string,
			excerpt: item.excerpt as string,
			date: item.date as string,
			category: item.category as string,
			tags: item.tags as string[],
			featured: item.featured as boolean,
			coverImage: item.coverImage as string | undefined,
			posts: (item.posts as Record<string, unknown>[]).map(p => ({
				id: p.id as string,
				type: 'solo' as const,
				title: p.title as string,
				slug: p.slug as string,
				excerpt: p.excerpt as string,
				category: p.category as string,
				tags: p.tags as string[],
				date: p.date as string,
				readingTime: p.readingTime as number,
				featured: p.featured as boolean,
				authors: p.authors as string[],
				coverImage: p.coverImage as string | undefined,
				externalLink: p.externalLink as string | undefined,
				accept<T>(visitor: BlogVisitor<T>): T {
					return visitor.visitSolo(this);
				}
			})),
			accept<T>(visitor: BlogVisitor<T>): T {
				return visitor.visitSeries(this);
			}
		};
		return series;
	} else {
		const post: SoloBlogPost = {
			id: item.id as string,
			type: 'solo',
			title: item.title as string,
			slug: item.slug as string,
			excerpt: item.excerpt as string,
			category: item.category as string,
			tags: item.tags as string[],
			date: item.date as string,
			readingTime: item.readingTime as number,
			featured: item.featured as boolean,
			authors: item.authors as string[],
			coverImage: item.coverImage as string | undefined,
			externalLink: item.externalLink as string | undefined,
			accept<T>(visitor: BlogVisitor<T>): T {
				return visitor.visitSolo(this);
			}
		};
		return post;
	}
}

/**
 * Get all blog items (series and solo posts) with visitor pattern support
 */
export const getAllBlogItems = (): BlogItem[] => {
	const data = getBlogData();
	return (data.items || []).map(item => deserializeBlogItem(item as unknown as Record<string, unknown>));
};

export const getAllBlogPosts = (): BlogPost[] => {
	const data = getBlogData();
	return data.posts;
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
	const data = getBlogData();
	return data.posts.filter(post => 
		data.featured.includes(post.id)
	);
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
	const data = getBlogData();
	return data.posts.find(post => post.id === id);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
	const data = getBlogData();
	return data.posts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
	const data = getBlogData();
	return data.posts.filter(post => 
		post.category === category
	);
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
	const data = getBlogData();
	return data.posts.filter(post => 
		post.tags.includes(tag)
	);
};

export const getRecentBlogPosts = (limit = 5): BlogPost[] => {
	const data = getBlogData();
	return data.posts
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, limit);
};

export const getAllBlogCategories = (): string[] => {
	const data = getBlogData();
	return data.categories;
};

export const getAllBlogTags = (): string[] => {
	const data = getBlogData();
	const allTags = data.posts.reduce((tags, post) => {
		return [...tags, ...post.tags];
	}, [] as string[]);
	return [...new Set(allTags)];
};

/**
 * Get all blog tags from items using visitor pattern
 */
export const getAllBlogTagsFromItems = (): string[] => {
	const items = getAllBlogItems();
	const allTags = new Set<string>();
	
	items.forEach(item => {
		const tags = item.accept({
			visitSolo(post: SoloBlogPost) {
				return post.tags;
			},
			visitSeries(series: BlogSeries) {
				return [...series.tags, ...series.posts.flatMap(p => p.tags)];
			}
		});
		tags.forEach(tag => allTags.add(tag));
	});

	return Array.from(allTags);
};

export const getAllBlogAuthors = (): string[] => {
	const data = getBlogData();
	const allAuthors = data.posts.reduce((authors, post) => {
		return [...authors, ...post.authors];
	}, [] as string[]);
	return [...new Set(allAuthors)];
};

export const getBlogPostsByAuthor = (author: string): BlogPost[] => {
	const data = getBlogData();
	return data.posts.filter(post => 
		post.authors.includes(author)
	);
};

// Export all data for sitemap generation or other needs
export const getAllData = () => ({
	personal: getPersonalData(),
	projects: getProjectsData(),
	library: getLibraryData(),
	blog: getBlogData()
});
