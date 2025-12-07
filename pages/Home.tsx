
import React, { useEffect, useState } from 'react';
import { Carousel } from '../components/Carousel';
import { Seo } from '../components/Seo';
import { Hero } from '../components/home/Hero';
import { ArcadeSection } from '../components/home/ArcadeSection';
import { HomeRankedList } from '../components/home/HomeRankedList';
import { HomeCarousel } from '../components/home/HomeCarousel';
import { useNavigate } from '../components/Seo';
import { AppItem, Category, CollectionConfig, SpotlightItem } from '../types';
import { api } from '../services/api';
import { getFilteredApps } from '../utils/catalogUtils';
import { Loader2 } from 'lucide-react';

interface HomeProps {
  addToCart: (app: AppItem) => void;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Home: React.FC<HomeProps> = ({ addToCart, notify }) => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<CollectionConfig[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [appsData, catsData, collsData, spotlightData] = await Promise.all([
          api.getApps(),
          api.getCategories(),
          api.getCollections(),
          api.getSpotlight()
        ]);
        
        setApps(appsData);
        setCategories(catsData);
        setCollections(collsData);
        setSpotlight(spotlightData);
      } catch (e) {
        console.error("Error loading home data", e);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAppClick = (id: string) => {
    navigate(`/app/${id}`);
    window.scrollTo(0, 0);
  };

  const handleAction = (e: React.MouseEvent, app: AppItem) => {
    addToCart(app);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader2 className="animate-spin text-apple-blue w-8 h-8" />
      </div>
    );
  }

  // Separate collections by type for layout
  const carouselCollections = collections.filter(c => c.type === 'carousel');
  const listCollections = collections.filter(c => c.type === 'list');

  return (
    <div className="min-h-screen pb-20 animate-fade-in dark:bg-black">
      <Seo 
        title="Discover" 
        description="Welcome to Aura Store. Discover the best apps, games, and experiences for your devices." 
      />

      <Hero onExplore={() => scrollToSection('featured')} />

      {/* Dynamic Carousel Collections (e.g., Featured) */}
      <div id="featured" className="mb-12">
        {apps.length > 0 ? (
          <>
            {carouselCollections.map(collection => (
               <HomeCarousel 
                  key={collection.id}
                  collection={collection}
                  apps={getFilteredApps(collection.id, apps)}
                  onAppClick={handleAppClick}
                  onAction={handleAction}
                  onSeeAll={(id) => navigate(`/collection/${id}`)}
               />
            ))}
          </>
        ) : (
          <div className="text-center py-10 px-4">
             <p className="text-slate-500 dark:text-slate-400">Apps will appear here once the catalog is online.</p>
          </div>
        )}
      </div>

      {/* Dynamic Categories Section */}
      {categories.length > 0 && (
        <section className="border-t border-b border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/5 py-20 mb-32" id="categories">
           <Carousel title="Browse by Category">
                {categories.map((cat) => (
                  <div 
                      key={cat.id} 
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className="snap-start shrink-0 w-72 h-44 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500 active:scale-95"
                  >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                     <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <span className="absolute bottom-5 left-5 text-white font-bold text-xl z-20 tracking-wide">{cat.name}</span>
                  </div>
                ))}
           </Carousel>
        </section>
      )}

      <ArcadeSection onAction={() => navigate('/arcade')} />

      {/* Dynamic List Collections (e.g. Top Free / Top Paid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
         {apps.length > 0 ? (
           <div className={`grid ${listCollections.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-20`}>
              {listCollections.map(collection => (
                <HomeRankedList 
                  key={collection.id}
                  title={collection.title} 
                  apps={getFilteredApps(collection.id, apps)}
                  onAppClick={handleAppClick}
                  onAction={handleAction}
                  onSeeAll={() => navigate(`/collection/${collection.id}`)}
                />
              ))}
           </div>
         ) : (
            <div className="text-center py-20 border border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
               <h3 className="text-lg font-medium text-slate-900 dark:text-white">Catalog Empty</h3>
               <p className="text-slate-500 mt-2">Connecting to backend...</p>
            </div>
         )}
      </section>

      {/* Dynamic Spotlight Section */}
      {spotlight && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
              <div 
                  className="relative rounded-[2.5rem] overflow-hidden h-[500px] group cursor-pointer shadow-2xl shadow-gray-200 dark:shadow-none"
                  onClick={() => navigate(`/collection/${spotlight.collectionId}`)}
              >
                  <img src={spotlight.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" alt={spotlight.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-3xl">
                      <span className="inline-block py-1 px-3 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-4 text-white">{spotlight.label}</span>
                      <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{spotlight.title}</h2>
                      <p className="text-lg md:text-xl text-gray-200 font-medium">{spotlight.subtitle}</p>
                  </div>
              </div>
        </section>
      )}

    </div>
  );
};
