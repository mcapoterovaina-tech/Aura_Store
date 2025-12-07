
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '../components/Seo';
import { AppItem } from '../types';
import { api } from '../services/api';
import { CATEGORIES } from '../constants';
import { AppCard } from '../components/AppCard';
import { ChevronLeft, Loader2, LayoutGrid } from 'lucide-react';
import { Seo } from '../components/Seo';

interface CategoryPageProps {
  addToCart: (app: AppItem) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);

  // We still use constants for the Title/Image of the category, 
  // but we fetch data based on ID from backend.
  const categoryInfo = CATEGORIES.find(c => c.id === id);
  const categoryName = categoryInfo ? categoryInfo.name : id;

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        setLoading(true);
        // Server-side filtering
        const data = await api.getAppsByCategory(id);
        setApps(data);
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (!categoryInfo && !loading && apps.length === 0) {
      return (
        <div className="min-h-screen pt-32 text-center dark:text-white dark:bg-black">
            <h2 className="text-2xl font-bold">Category not found</h2>
            <button onClick={() => navigate('/')} className="text-apple-blue mt-4 hover:underline">Go Home</button>
        </div>
      );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
      <Seo title={categoryName || 'Category'} />
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="ml-1 font-medium">Back</span>
        </button>

        <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{categoryName}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Browse our collection of {categoryName?.toLowerCase()} apps.</p>
        </div>

        {loading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-slate-400" />
             </div>
        ) : (
            <>
                {apps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {apps.map(app => (
                             <div key={app.id} className="h-full">
                                <AppCard 
                                    app={app} 
                                    onClick={(id) => navigate(`/app/${id}`)}
                                    onAction={(e, app) => addToCart(app)}
                                />
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                        <LayoutGrid size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">No apps found in this category.</p>
                        <p className="text-slate-400 text-sm mt-2">Check backend connection.</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};
