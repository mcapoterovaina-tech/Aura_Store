
export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number; // 0 for free
  currency?: string;
  rating: number;
  reviewsCount: number;
  iconUrl: string;
  screenshots: string[];
  developer: string;
  size: string;
  version: string;
  ageRating: string;
  platforms?: string[];
  releaseDate?: string;
  downloadUrl?: string;
  // Dynamic Stats
  chartRanking?: number;
  securityVerified?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

// New Interface for dynamic Home Sections served by Backend
export interface CollectionConfig {
  id: string; // e.g., 'featured', 'top-free'
  title: string; // e.g., 'Featured Apps'
  type: 'carousel' | 'list' | 'grid'; // How to display it
  filter?: string; // Query param hint (optional)
}

export interface SpotlightItem {
  id: string;
  collectionId: string; // The ID of the collection to navigate to
  title: string;
  subtitle: string;
  label: string;
  imageUrl: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
  library: string[]; // Array of App IDs owned by user
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean; // Mock state
  isSaved?: boolean; // Mock state
}

// New Interfaces for Legal/Content Pages
export interface LegalSection {
  heading?: string;
  content: string; // Supports basic HTML or text
  imageUrl?: string; // Optional image served by API
  videoUrl?: string; // Optional video served by API
}

export interface LegalDocument {
  id: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}
