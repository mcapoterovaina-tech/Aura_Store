
import { LegalDocument } from '../types';
import { client } from './config';

export const getTermsOfUse = async (): Promise<LegalDocument | null> => {
  try {
    const data = await client('/pages/terms');
    return data;
  } catch (error) {
    console.warn("API Error (Terms): Backend offline.", error);
    return null;
  }
};
