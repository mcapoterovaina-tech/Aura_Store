
import { Category } from '../types';
import { API_BASE_URL, handleResponse } from './config';

// Fetch Categories dynamically from Backend
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.warn("API Error (getCategories): Backend offline.", error);
    // No mock data. If backend is down, show nothing.
    return [];
  }
};
