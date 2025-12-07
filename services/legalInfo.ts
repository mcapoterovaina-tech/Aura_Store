
import { LegalDocument } from '../types';
import { client } from './config';

export const getLegalInformation = async (): Promise<LegalDocument | null> => {
  try {
    const data = await client('/pages/legal');
    return data;
  } catch (error) {
    console.warn("API Error (Legal): Backend offline.", error);
    return null;
  }
};
