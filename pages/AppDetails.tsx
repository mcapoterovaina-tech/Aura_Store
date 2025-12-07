
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../components/Seo';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { ShieldCheck, ChevronLeft, Loader2 } from 'lucide-react';
import { AppItem, User } from '../types';
import { api } from '../services/api';

// Sub-components
import { AppHeader } from '../components/details/AppHeader';
import { AppStats } from '../components/details/AppStats';
import { AppScreenshots } from '../components/details/AppScreenshots';
import { AppInfo } from '../components/details/AppInfo';

interface AppDetailsProps {
  addToCart: (app: AppItem) => void;
  user?: User;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const AppDetails: React.FC<AppDetailsProps> = ({ addToCart, user, notify }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<AppItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      setLoading(true);
      if (id) {
          const data = await api.getAppById(id);
          setApp(data);
      }
      setLoading(false);
    };
    fetchApp();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-black">
            <Loader2 className="animate-spin text-apple-blue w-8 h-8" />
        </div>
    );
  }

  if (!app) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black px-4 text-center">
            <Seo title="Not Found" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">App not found</h2>
            <p className="text-slate-500 mb-6">The app you requested doesn't exist in the current catalog.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
    );
  }

  const isOwned = user?.library.includes(app.id);

  const handleMainAction = () => {
      if (isOwned || downloadComplete) {
          notify(`Opening ${app.name}...`, 'success');
          return;
      }

      if (app.price === 0 && user?.isLoggedIn) {
          setIsDownloading(true);
          setTimeout(() => {
              setIsDownloading(false);
              setDownloadComplete(true);
              notify('Download started', 'success');
              if (app.downloadUrl) {
                  window.open(app.downloadUrl, '_blank');
              }
          }, 2000);
      } else {
          addToCart(app);
      }
  };

  const renderButtonText = () => {
      if (isDownloading) return 'Downloading...';
      if (downloadComplete) return 'Open';
      if (isOwned) return 'Open';
      if (app.price === 0) return 'Get';
      return `${app.currency || '$'}${app.price}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20 animate-fade-in">
      <Seo title={app.name} description={app.description} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="ml-1 font-medium">Back</span>
        </button>

        {/* 1. App Header */}
        <AppHeader 
            app={app}
            onAction={handleMainAction}
            buttonText={renderButtonText()}
            isDownloading={isDownloading}
            downloadComplete={downloadComplete}
            notify={notify}
        />

        {/* 2. Stats Grid */}
        <AppStats app={app} />

        {/* 3. Screenshots Carousel */}
        <AppScreenshots screenshots={app.screenshots} />

        {/* 4. Description & Info */}
        <AppInfo app={app} />
        
        {/* Security Badge - Conditional */}
        {app.securityVerified && (
            <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-white/5 rounded-3xl border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-300 mb-12 text-center animate-slide-up">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                <ShieldCheck size={32} />
                </div>
                <div>
                <p className="font-bold text-lg">Verified Security</p>
                <p className="text-blue-600/80 dark:text-blue-400/80">This app has been scanned and contains no malware.</p>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
