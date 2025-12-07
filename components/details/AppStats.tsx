
import React from 'react';
import { AppItem } from '../../types';
import { Star } from 'lucide-react';

interface AppStatsProps {
  app: AppItem;
}

export const AppStats: React.FC<AppStatsProps> = ({ app }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 py-8 border-t border-gray-100 dark:border-white/10 mb-12 overflow-x-auto no-scrollbar">
        <div className="flex flex-col items-center justify-center border-r border-gray-100 dark:border-white/10 px-4 min-w-[100px]">
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-lg font-bold mb-1">
                <span>{app.rating.toFixed(1)}</span>
                <Star size={16} fill="currentColor" className="ml-1 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Ratings</div>
        </div>
        <div className="flex flex-col items-center justify-center border-r border-gray-100 dark:border-white/10 px-4 min-w-[100px]">
            <div className="text-slate-600 dark:text-slate-300 text-lg font-bold mb-1">{app.ageRating}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Age</div>
        </div>
        
        {/* Dynamic Chart Column - Only show if ranking exists */}
        {app.chartRanking ? (
             <div className="flex flex-col items-center justify-center border-r border-gray-100 dark:border-white/10 px-4 min-w-[100px]">
                <div className="text-slate-600 dark:text-slate-300 text-lg font-bold mb-1">No. {app.chartRanking}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Chart</div>
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center border-r border-gray-100 dark:border-white/10 px-4 min-w-[100px] opacity-50">
                <div className="text-slate-600 dark:text-slate-300 text-lg font-bold mb-1">-</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Chart</div>
            </div>
        )}

         <div className="hidden md:flex flex-col items-center justify-center border-r border-gray-100 dark:border-white/10 px-4 min-w-[100px]">
            <div className="text-slate-600 dark:text-slate-300 text-lg font-bold mb-1 truncate max-w-[120px]" title={app.developer}>{app.developer}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Developer</div>
        </div>
         <div className="hidden md:flex flex-col items-center justify-center px-4 min-w-[100px]">
            <div className="text-slate-600 dark:text-slate-300 text-lg font-bold mb-1">{app.size}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Size</div>
        </div>
    </div>
  );
};
