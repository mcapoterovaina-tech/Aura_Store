
import { LegalDocument } from '../types';
import { client } from './config';

export const getSalesPolicy = async (): Promise<LegalDocument | null> => {
  try {
    const data = await client('/pages/sales');
    return data;
  } catch (error) {
    console.warn("API Error (Sales): Backend offline.", error);
    return null;
  }
};
