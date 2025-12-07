
import { CollectionConfig, SpotlightItem } from '../types';
import { client } from './config';

// Fetch Home Page Collections (Featured, Top Free, etc) configuration
export const getCollections = async (): Promise<CollectionConfig[]> => {
  try {
    const data = await client('/collections');
    return data;
  } catch (error) {
    console.warn("API Error (getCollections): Backend offline.", error);
    // No mock data. If backend is down, show nothing.
    return [];
  }
};

// Fetch "Editor's Choice" Spotlight Banner
export const getSpotlight = async (): Promise<SpotlightItem | null> => {
  try {
    const data = await client('/collections/spotlight');
    return data;
  } catch (error) {
    console.warn("API Error (getSpotlight): Backend offline.", error);
    return null;
  }
};
