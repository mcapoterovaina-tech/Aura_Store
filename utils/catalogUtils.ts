
import { AppItem } from '../types';

export const getFilteredApps = (collectionId: string, allApps: AppItem[]): AppItem[] => {
  // Simple frontend filtering logic to match backend collection config
  // In a real scenario, you might fetch /api/collections/:id/apps
  switch(collectionId) {
    case 'featured': return allApps.slice(0, 5);
    case 'top-free': return allApps.filter(a => a.price === 0).slice(0, 4);
    case 'top-paid': return allApps.filter(a => a.price > 0).slice(0, 4);
    default: return allApps.slice(0, 4);
  }
};
