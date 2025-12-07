
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '../components/Seo';
import { AppItem } from '../types';
import { api } from '../services/api';
import { AppCard } from '../components/AppCard';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Seo } from '../components/Seo';

interface CollectionPageProps {
  addToCart: (app: AppItem) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ addToCart }) => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (type) {
        setLoading(true);
        // Set formatted title based on slug
        const formattedTitle = type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setTitle(formattedTitle);

        // Server-side filtering
        const data = await api.getAppsByCollection(type);
        setApps(data);
        setLoading(false);
      }
    };
    loadData();
  }, [type]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
      <Seo title={title || 'Collection'} />
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="ml-1 font-medium">Back</span>
        </button>

        <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Explore our curated list of {title.toLowerCase()}.</p>
        </div>

        {loading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-slate-400" />
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apps.length > 0 ? (
                    apps.map(app => (
                            <div key={app.id} className="h-full">
                            <AppCard 
                                app={app} 
                                onClick={(id) => navigate(`/app/${id}`)}
                                onAction={(e, app) => addToCart(app)}
                            />
                            </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                        <p className="text-slate-500 text-lg">No apps found for this collection.</p>
                        <p className="text-slate-400 text-sm mt-2">Check backend connection.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
