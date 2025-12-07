
import { LegalDocument } from '../types';
import { client } from './config';

export const getSitemap = async (): Promise<LegalDocument | null> => {
  try {
    const data = await client('/pages/sitemap');
    return data;
  } catch (error) {
    console.warn("API Error (Sitemap): Backend offline.", error);
    return null;
  }
};
