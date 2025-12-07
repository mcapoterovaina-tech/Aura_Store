
import * as catalog from './catalog';
import * as categories from './categories';
import * as collections from './collections';
import * as news from './news';
import * as footer from './footer';
import * as auth from './auth';
import * as cart from './cart';
import * as tax from './tax';

// Import separated legal services
import * as privacy from './legal';
import * as terms from './terms';
import * as sales from './sales';
import * as legalInfo from './legalInfo';
import * as sitemap from './sitemap';

// Aggregator with custom logic for dynamic page routing
export const api = {
  ...catalog,
  ...categories,
  ...collections,
  ...news,
  ...footer,
  
  // Dynamic page content fetcher (Dispatcher)
  getPageContent: async (slug: string) => {
    switch (slug) {
        case 'privacy': return privacy.getPrivacyPolicy();
        case 'terms': return terms.getTermsOfUse();
        case 'sales': return sales.getSalesPolicy();
        case 'legal': return legalInfo.getLegalInformation();
        case 'sitemap': return sitemap.getSitemap();
        default: 
            console.warn(`No service found for page slug: ${slug}`);
            return null;
    }
  },

  auth,
  cart,
  tax
};
