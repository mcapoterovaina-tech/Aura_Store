
import React, { useState, useEffect } from 'react';
import { Seo } from '../components/Seo';
import { Loader2, Newspaper } from 'lucide-react';
import { NewsPost } from '../types';
import { api } from '../services/api';
import { NewsCard } from '../components/news/NewsCard';

interface NoticeProps {
    notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Notice: React.FC<NoticeProps> = ({ notify }) => {
    const [news, setNews] = useState<NewsPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Assuming there might be more

    useEffect(() => {
        const loadInitial = async () => {
            setLoading(true);
            const data = await api.getNews(1);
            setNews(data);
            setLoading(false);
            if(data.length === 0) setHasMore(false);
        };
        loadInitial();
    }, []);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        const moreData = await api.getNews(nextPage);
        
        if (moreData.length > 0) {
            setNews(prev => [...prev, ...moreData]);
            setPage(nextPage);
        } else {
            setHasMore(false);
            notify("No more stories to load.", "info");
        }
        setLoadingMore(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-black">
                <Loader2 className="animate-spin text-apple-blue w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 animate-fade-in dark:bg-black">
            <Seo title="Notice" description="Stay updated with the latest news, events, and stories from the world of apps." />
            
            <div className="max-w-2xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <span className="text-apple-blue font-bold tracking-wider uppercase text-xs mb-2 block">Feed</span>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Today</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Daily stories, news, and inspiration.</p>
                </div>

                {news.length > 0 ? (
                    <div className="space-y-12">
                        {news.map((post) => (
                            <NewsCard key={post.id} post={post} notify={notify} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                        <Newspaper size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">No stories available.</p>
                        <p className="text-slate-400 text-sm mt-2">Check backend connection.</p>
                    </div>
                )}
                
                {news.length > 0 && hasMore && (
                    <div className="mt-16 text-center">
                        <button 
                            onClick={handleLoadMore} 
                            disabled={loadingMore}
                            className="px-8 py-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/20 transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
                        >
                            {loadingMore && <Loader2 size={16} className="animate-spin" />}
                            {loadingMore ? 'Loading...' : 'Load More Stories'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
