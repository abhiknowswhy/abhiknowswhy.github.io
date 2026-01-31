import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';

import type {
	PersonalData,
	ProjectsData,
	Project
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

// Search functionality
export const searchContent = (query: string, types: string[] = ['projects']) => {
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

// Export all data for sitemap generation or other needs
export const getAllData = () => ({
	personal: getPersonalData(),
	projects: getProjectsData()
});
