
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Loader2 } from 'lucide-react';
import { AppItem } from '../types';
import { useNavigate } from './Seo';
import { api } from '../services/api';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AppItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      
      setIsSearching(true);
      const data = await api.searchApps(query);
      setResults(data);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (id: string) => {
    navigate(`/app/${id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search apps, games, and stories"
              className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 text-xl font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-apple-blue focus:bg-white transition-all outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search input"
            />
          </div>
          <button 
            onClick={onClose}
            className="text-apple-blue font-medium hover:underline text-lg"
            aria-label="Cancel search"
          >
            Cancel
          </button>
        </div>

        {/* Suggested / Results */}
        <div className="space-y-2">
          {query === '' ? (
             <div className="mt-8">
                <h3 className="text-slate-400 font-semibold text-xs uppercase tracking-wider mb-4">Trending</h3>
                {/* We could also fetch trending apps from API here */}
                <div className="text-slate-400 text-sm italic">Type to search the catalog...</div>
             </div>
          ) : (
            <>
                {isSearching ? (
                   <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin text-slate-400" />
                   </div>
                ) : (
                  <>
                    {results.length > 0 ? (
                        results.map(app => (
                            <div 
                                key={app.id} 
                                onClick={() => handleNavigate(app.id)}
                                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                role="button"
                                tabIndex={0}
                                aria-label={`View details for ${app.name}`}
                            >
                                <img src={app.iconUrl} alt="" className="w-14 h-14 rounded-xl shadow-sm" aria-hidden="true" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 text-lg">{app.name}</h4>
                                    <p className="text-sm text-slate-500">{app.category}</p>
                                </div>
                                <ChevronRight className="text-slate-300" />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">No results found for "{query}"</p>
                        </div>
                    )}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
