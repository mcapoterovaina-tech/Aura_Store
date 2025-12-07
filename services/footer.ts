
import { FooterSection } from '../types';
import { client } from './config';

// Fetch Footer Sections (Shop, Services, Account, About)
export const getFooter = async (): Promise<FooterSection[]> => {
  try {
    const data = await client('/footer');
    return data;
  } catch (error) {
    console.warn("API Error (getFooter): Backend offline or empty.", error);
    // Return structure with titles but empty links as requested, 
    // strictly reflecting that the backend hasn't provided the links yet.
    return [
      {
        id: 'shop',
        title: 'Shop and Learn',
        links: []
      },
      {
        id: 'services',
        title: 'Services',
        links: []
      },
      {
        id: 'account',
        title: 'Account',
        links: []
      },
      {
        id: 'about',
        title: 'About Aura',
        links: []
      }
    ];
  }
};
