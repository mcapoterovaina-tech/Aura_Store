
import React, { useEffect, useState } from 'react';
import { AppCard } from '../components/AppCard';
import { useNavigate } from '../components/Seo';
import { AppItem } from '../types';
import { Gamepad2, ChevronLeft, Loader2, Check } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Button } from '../components/Button';
import { api } from '../services/api';

interface ArcadeProps {
  addToCart: (app: AppItem) => void;
}

export const Arcade: React.FC<ArcadeProps> = ({ addToCart }) => {
  const navigate = useNavigate();
  const [arcadeApps, setArcadeApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // Local state for demo UI

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const allApps = await api.getApps();
      const games = allApps.filter(app => app.category === 'Games');
      setArcadeApps(games);
      setLoading(false);
    };
    fetchGames();
  }, []);

  const handleSubscribe = async () => {
      // Mock User ID
      const USER_ID = "u-demo-123"; 
      setSubscribing(true);
      
      const success = await api.cart.subscribe(USER_ID, "plan-arcade-monthly");
      
      if (success) {
          setIsSubscribed(true);
      } else {
          alert("Subscription failed. Backend unavailable.");
      }
      setSubscribing(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
      <Seo title="Arcade" description="Unlimited play. One subscription." />
      
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="ml-1 font-medium">Back</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                 <div className="flex items-center gap-3 mb-2">
                    <Gamepad2 className="text-apple-blue" size={32} />
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Aura Arcade</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
                    Access a collection of groundbreaking games. No ads. No in-app purchases.
                </p>
            </div>
            <div className="hidden md:block">
                 <Button 
                    onClick={handleSubscribe} 
                    disabled={subscribing || isSubscribed}
                    className={`bg-slate-900 dark:bg-white text-white dark:text-black min-w-[180px] ${isSubscribed ? 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700' : ''}`}
                 >
                    {isSubscribed ? (
                        <span className="flex items-center gap-2"><Check size={18} /> Active</span>
                    ) : (
                        subscribing ? 'Processing...' : 'Subscribe to Arcade'
                    )}
                 </Button>
            </div>
        </div>
        
        {loading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-slate-400" />
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {arcadeApps.map(app => (
                    <div key={app.id} className="h-full">
                        <AppCard 
                            app={app}
                            onClick={(id) => navigate(`/app/${id}`)}
                            onAction={(e, app) => addToCart(app)}
                        />
                    </div>
                ))}
            </div>
        )}
        
        {!loading && arcadeApps.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                <Gamepad2 size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg">No arcade games available yet.</p>
                <p className="text-slate-400 text-sm mt-2">Check backend connection.</p>
            </div>
        )}
      </div>
    </div>
  );
};
