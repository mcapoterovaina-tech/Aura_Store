
import React from 'react';
import { AppItem } from '../../types';
import { Button } from '../Button';

interface HomeRankedListProps {
  title: string;
  apps: AppItem[];
  onAppClick: (id: string) => void;
  onAction: (e: React.MouseEvent, app: AppItem) => void;
  onSeeAll: () => void;
}

export const HomeRankedList: React.FC<HomeRankedListProps> = ({ title, apps, onAppClick, onAction, onSeeAll }) => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <Button variant="ghost" size="sm" onClick={onSeeAll}>See All</Button>
    </div>
    <div className="space-y-2">
      {apps.map((app, index) => (
        <div 
          key={app.id} 
          onClick={() => onAppClick(app.id)} 
          className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 dark:active:bg-white/10 transition-colors cursor-pointer group"
        >
          <span className="font-bold text-slate-300 dark:text-slate-600 text-xl w-6 flex-shrink-0">{index + 1}</span>
          <img src={app.iconUrl} alt="" className="w-16 h-16 rounded-[14px] object-cover shadow-sm group-hover:shadow-md transition-all bg-gray-100 dark:bg-white/10" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 dark:text-white truncate">{app.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{app.category}</p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAction(e, app);
            }}
            className="rounded-full px-5 py-1.5 text-xs font-bold bg-gray-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-white/20 flex-shrink-0"
          >
            {app.price === 0 ? 'GET' : `$${app.price}`}
          </Button>
        </div>
      ))}
      {apps.length === 0 && (
          <div className="text-slate-400 text-sm italic">No ranking available</div>
      )}
    </div>
  </div>
);
