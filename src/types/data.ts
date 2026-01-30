// Personal Data Types
export interface PersonalProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  profileImage: string;
  resumeUrl?: string;
  availability: string;
  tagline: string;
  skills: string[];
  interests: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  medium?: string;
  dev?: string;
  leetcode?: string;
  codeforces?: string;
  buymeacoffee?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string; // null means current
  description: string;
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
  companyUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  description?: string;
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
}

export interface PersonalData {
  profile: PersonalProfile;
  social: SocialLinks;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

// Project Data Types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  technologies: string[];
  features: string[];
  highlights?: string[];
  status: 'completed' | 'in-progress' | 'planning' | 'archived';
  startDate: string;
  endDate?: string;
  thumbnail: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  visible: boolean;
  challenges?: string[];
  solutions?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface ProjectsData {
  categories: string[];
  featured: string[];
  projects: Project[];
}

// Book Data Types
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  genre: string[];
  rating?: number; // 1-5 scale
  review?: string;
  notes?: string;
  coverImage: string;
  readingStatus: 'want-to-read' | 'currently-reading' | 'read' | 'did-not-finish';
  startDate?: string;
  finishDate?: string;
  favorite: boolean;
  quotes?: string[];
  goodreadsUrl?: string;
  amazonUrl?: string;
}

export interface ReadingGoal {
  year: number;
  target: number;
  completed: number;
}

export interface LibraryData {
  currentlyReading: string[];
  readingGoals: ReadingGoal[];
  favoriteGenres: string[];
  books: Book[];
}

// Travel Data Types
export interface TravelPlace {
  id: string;
  name: string;
  country: string;
  city?: string;
  region?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  visitDate: string;
  duration?: string; // e.g., "3 days", "1 week"
  category: 'city' | 'nature' | 'historical' | 'adventure' | 'cultural' | 'beach' | 'mountain';
  description?: string;
  highlights: string[];
  photos: string[];
  favorite: boolean;
  rating?: number; // 1-5 scale
  budget?: {
    currency: string;
    amount: number;
  };
  accommodation?: string;
  transportation?: string;
  weather?: string;
  tips?: string[];
  wouldRevisit: boolean;
}

export interface TravelData {
  visitedCountries: number;
  visitedCities: number;
  totalTrips: number;
  favoritePlaces: string[];
  bucketList: string[];
  visitedPlaces: TravelPlace[];
}

// Music Data Types
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre: string[];
  duration?: string; // e.g., "3:45"
  releaseYear?: number;
  bpm?: number;
  key?: string;
  mood: string[];
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleMusicUrl?: string;
  favorite: boolean;
  rating?: number; // 1-5 scale
  addedDate: string;
  playCount?: number;
  notes?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage: string;
  trackIds: string[];
  createdDate: string;
  updatedDate: string;
  totalDuration?: string;
  isPublic: boolean;
  genre: string[];
  mood: string[];
  spotifyUrl?: string;
}

export interface MusicStats {
  totalTracks: number;
  totalPlaylists: number;
  favoriteGenres: string[];
  topArtists: string[];
  totalListeningTime?: string;
}

export interface MusicData {
  stats: MusicStats;
  playlists: Playlist[];
  tracks: MusicTrack[];
}

// Art Data Types
export interface Artwork {
  id: string;
  title: string;
  description?: string;
  category: string;
  medium: string; // e.g., "Digital Art", "Photography", "Sketch", "3D Render"
  dimensions?: string;
  createdDate: string;
  imageUrl: string;
  thumbnailUrl?: string;
  featured: boolean;
  tags: string[];
  tools?: string[]; // Software/tools used
  settings?: string; // Camera settings, software settings, etc.
  inspiration?: string;
  process?: string; // Creation process description
  timeSpent?: string;
  prints?: {
    available: boolean;
    price?: string;
    sizes?: string[];
  };
  awards?: string[];
  exhibitions?: string[];
  sold?: boolean;
}

export interface ArtworkData {
  categories: string[];
  mediums: string[];
  totalArtworks: number;
  featuredArtworks: string[];
  artwork: Artwork[];
}

// Blog Data Types
// Blog Visitor Pattern Types
export interface BlogVisitor<T> {
  visitSolo(post: SoloBlogPost): T;
  visitSeries(series: BlogSeries): T;
}

// Base BlogItem interface
export interface BlogItem {
  id: string;
  type: 'series' | 'solo';
  accept<T>(visitor: BlogVisitor<T>): T;
}

// Solo blog post
export interface SoloBlogPost extends BlogItem {
  type: 'solo';
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string; // Display date (YYYY-MM-DD format)
  readingTime: number; // in minutes
  featured: boolean;
  authors: string[];
  coverImage?: string;
  externalLink?: string; // Link to external blog (e.g., Medium article)
}

// Blog series (contains multiple solo posts)
export interface BlogSeries extends BlogItem {
  type: 'series';
  title: string;
  description: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  featured: boolean;
  coverImage?: string;
  posts: SoloBlogPost[];
}

// Legacy BlogPost type (kept for compatibility, maps to SoloBlogPost)
export type BlogPost = SoloBlogPost;

export interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  postCount: number;
}

export interface BlogData {
  categories: string[];
  featured: string[];
  items: BlogItem[];
  posts: SoloBlogPost[]; // Legacy - kept for compatibility
}

// Contact Data Types
export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  availableHours?: string;
  responseTime?: string;
  preferredContact: 'email' | 'phone' | 'linkedin';
  calendlyUrl?: string;
  languages: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  projectType?: string;
  timeline?: string;
}

// SEO and Meta Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  ogImage?: string;
  twitterCard?: string;
  favicon?: string;
}

// Theme Types
export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  enableThemeToggle: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface NavigationData {
  mainNav: NavigationItem[];
  footerNav: NavigationItem[];
  socialNav: NavigationItem[];
}

// Global Configuration
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: PersonalProfile;
  social: SocialLinks;
  seo: SEOData;
  theme: ThemeConfig;
  navigation: NavigationData;
  contact: ContactInfo;
  features: {
    blog: boolean;
    projects: boolean;
    travel: boolean;
    music: boolean;
    art: boolean;
    contact: boolean;
  };
}

// API Response Types
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

// Search Types
export interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'blog' | 'page';
  excerpt: string;
  url: string;
  relevance: number;
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PageView {
  page: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}
