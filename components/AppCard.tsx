import React from 'react';
import { AppItem } from '../types';
import { Button } from './Button';
import { Star } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onClick: (id: string) => void;
  onAction: (e: React.MouseEvent, app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick, onAction }) => {
  return (
    <div 
      onClick={() => onClick(app.id)}
      className="group relative flex flex-col p-6 rounded-[2rem] bg-white dark:bg-night-card/60 dark:backdrop-blur-md border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-hover hover:border-gray-200/50 dark:hover:border-white/10 hover:-translate-y-1 active:scale-[0.98] cursor-pointer h-full overflow-hidden"
      role="article"
      aria-label={`View details for ${app.name}`}
    >
      <div className="flex items-start justify-between mb-6 relative">
        <div className="relative">
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-[1.25rem] transform translate-y-2 scale-90 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src={app.iconUrl} 
            alt="" 
            aria-hidden="true"
            className="relative z-10 w-[5.5rem] h-[5.5rem] rounded-[1.4rem] shadow-sm object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-100 dark:bg-white/10"
          />
        </div>
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {/* Placeholder for a bookmark or action icon if needed */}
        </div>
      </div>
      
      <div className="flex-1 mb-6">
        <h3 className="font-semibold text-[1.15rem] text-slate-900 dark:text-white leading-tight mb-1.5 tracking-tight">{app.name}</h3>
        <p className="text-[0.9rem] text-slate-500 dark:text-slate-400 font-medium mb-2">{app.category}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed font-medium">{app.tagline}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50 dark:border-white/5">
        <div className="flex items-center gap-1">
          <Star size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-sm text-slate-600 dark:text-slate-300 font-bold">{app.rating}</span>
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAction(e, app);
          }}
          className="font-bold text-[11px] uppercase tracking-wide px-6 py-2.5 bg-slate-100 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-white/20 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white transition-all duration-300"
        >
          {app.price === 0 ? 'Get' : `$${app.price}`}
        </Button>
      </div>
    </div>
  );
};