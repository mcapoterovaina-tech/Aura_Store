import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppScreenshotsProps {
  screenshots: string[];
}

export const AppScreenshots: React.FC<AppScreenshotsProps> = ({ screenshots }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!screenshots || screenshots.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-16 relative group">
        <div className="flex justify-between items-end mb-6">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Preview</h2>
        </div>
        
        {/* Nav Left */}
        <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-6 top-[60%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 border border-gray-100 dark:border-white/10"
            aria-label="Scroll left"
        >
            <ChevronLeft size={24} />
        </button>

        <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x scroll-pl-4"
        >
            {screenshots.map((shot, i) => (
                <img 
                    key={i} 
                    src={shot} 
                    alt={`App screenshot ${i+1}`} 
                    className="h-[350px] md:h-[450px] rounded-[1.75rem] shadow-soft snap-center border border-gray-100 dark:border-white/10 object-cover shrink-0 select-none hover:scale-[1.01] transition-transform duration-500 bg-gray-100 dark:bg-white/5"
                />
            ))}
        </div>

        {/* Nav Right */}
        <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-6 top-[60%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black hover:scale-110 border border-gray-100 dark:border-white/10"
            aria-label="Scroll right"
        >
            <ChevronRight size={24} />
        </button>
    </div>
  );
};