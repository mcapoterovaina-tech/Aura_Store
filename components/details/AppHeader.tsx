
import React, { useState } from 'react';
import { AppItem } from '../../types';
import { Button } from '../Button';
import { ShareMenu } from '../ShareMenu';
import { Download, Check, Share2 } from 'lucide-react';

interface AppHeaderProps {
  app: AppItem;
  onAction: () => void;
  buttonText: string;
  isDownloading: boolean;
  downloadComplete: boolean;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  app, 
  onAction, 
  buttonText, 
  isDownloading, 
  downloadComplete,
  notify
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-10 mb-16">
      <img 
        src={app.iconUrl} 
        alt={app.name} 
        className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-white/10 object-cover animate-scale-in bg-gray-100 dark:bg-white/5" 
      />
      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 leading-tight">{app.name}</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-2">{app.tagline}</p>
          <div className="flex items-center gap-2 text-sm text-apple-blue dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-500/10 w-fit px-3 py-1 rounded-full">
            {app.category} &bull; {app.ageRating}
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-start gap-4 mt-8 md:mt-0 relative">
           <Button 
            size="lg" 
            onClick={onAction}
            className={`px-10 py-4 text-lg min-w-[160px] rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95 ${downloadComplete ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : ''}`}
            disabled={isDownloading}
            aria-label={downloadComplete ? 'Open App' : isDownloading ? 'Downloading' : buttonText}
            >
             <div className="flex items-center gap-2">
                {isDownloading && <Download className="animate-bounce" size={20} />}
                {downloadComplete && <Check size={20} />}
                <span>{buttonText}</span>
             </div>
           </Button>
           
           {/* Share Button & Menu */}
           <div className="relative">
                <button 
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="p-4 rounded-full bg-gray-50 dark:bg-white/10 text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/20 hover:text-apple-blue dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 dark:focus:ring-slate-700"
                    aria-label="Share this app"
                >
                    <Share2 size={22} />
                </button>

                <ShareMenu 
                    isOpen={isShareMenuOpen} 
                    onClose={() => setIsShareMenuOpen(false)}
                    title={`Check out ${app.name} on Aura Store!`}
                    onCopySuccess={() => notify('Link copied to clipboard', 'success')}
                />
           </div>
        </div>
      </div>
    </div>
  );
};
