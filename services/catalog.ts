
import { AppItem } from '../types';
import { client } from './config';

// Premium SVG Placeholder generator
const getPlaceholderIcon = (name: string) => {
  const bgColors = ['1A1A1A', '2563EB', '7C3AED', 'DB2777', '059669', 'D97706'];
  // Simple hash for consistent color
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = bgColors[hash % bgColors.length];

  const svg = `
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#${color}"/>
      <text x="100" y="100" font-family="sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">
        ${name.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Fetch all apps (Catalog) - General purpose
export const getApps = async (): Promise<AppItem[]> => {
  try {
    const data = await client('/catalogo');
    return mapDataToAppItems(data);
  } catch (error) {
    console.warn("API Error (getApps): Backend offline.", error);
    return [];
  }
};

// Fetch apps by specific category (Server-side filtering)
export const getAppsByCategory = async (categoryId: string): Promise<AppItem[]> => {
  try {
    const data = await client(`/apps?category=${categoryId}`);
    return mapDataToAppItems(data);
  } catch (error) {
    console.warn(`API Error (Category ${categoryId}): Backend offline.`, error);
    return [];
  }
};

// Fetch apps by specific collection/section (Server-side filtering)
export const getAppsByCollection = async (collectionId: string): Promise<AppItem[]> => {
  try {
    const data = await client(`/collections/${collectionId}/apps`);
    return mapDataToAppItems(data);
  } catch (error) {
    console.warn(`API Error (Collection ${collectionId}): Backend offline.`, error);
    return [];
  }
};

// Fetch a single app by ID
export const getAppById = async (id: string): Promise<AppItem | undefined> => {
  try {
    const data = await client(`/apps/${id}`);
    const mapped = mapDataToAppItems([data]);
    return mapped[0];
  } catch (error) {
    console.warn(`API Error (getAppById): Could not fetch app ${id}`, error);
    return undefined;
  }
};

// Search apps (Server-side search)
export const searchApps = async (query: string): Promise<AppItem[]> => {
  if (!query) return [];
  try {
    const data = await client(`/apps/search?q=${encodeURIComponent(query)}`);
    return mapDataToAppItems(data);
  } catch (error) {
    console.warn("API Error (searchApps): Backend offline.", error);
    return [];
  }
};

// Helper to map raw JSON to AppItem interface
const mapDataToAppItems = (data: any[]): AppItem[] => {
  if (!Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id || Math.random().toString(36).substr(2, 9),
    name: item.name,
    tagline: item.tagline || 'Description unavailable',
    description: item.description || '',
    category: item.category || 'Productivity',
    price: item.price !== undefined ? item.price : 0,
    currency: item.currency || 'USD',
    rating: item.rating || 0,
    reviewsCount: item.reviewsCount || 0,
    iconUrl: item.iconUrl || getPlaceholderIcon(item.name || '?'),
    screenshots: item.screenshots || [],
    developer: item.developer || 'Unknown',
    size: item.size || '0 MB',
    version: item.version || '1.0',
    ageRating: item.ageRating || '4+',
    platforms: item.platforms || ['Web'],
    releaseDate: item.releaseDate,
    downloadUrl: item.downloadUrl,
    // Dynamic Fields with fallbacks if API doesn't send them yet
    chartRanking: item.chartRanking,
    securityVerified: item.securityVerified !== undefined ? item.securityVerified : false
  }));
};
