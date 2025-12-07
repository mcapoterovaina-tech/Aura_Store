
import { LegalDocument } from '../types';
import { client } from './config';

// Service dedicated strictly to Privacy Policy
export const getPrivacyPolicy = async (): Promise<LegalDocument | null> => {
  try {
    const data = await client('/pages/privacy');
    return data;
  } catch (error) {
    console.warn("API Error (Privacy): Backend offline.", error);
    // Return null to indicate no data is available from backend
    return null;
  }
};
