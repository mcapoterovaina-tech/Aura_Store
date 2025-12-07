import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  title?: string;
  children: React.ReactNode;
  seeAllLink?: string;
  onSeeAll?: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({ title, children, seeAllLink, onSeeAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-8 group relative">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-4 max-w-7xl mx-auto">
        {title && <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>}
        {seeAllLink && (
           <button 
            onClick={onSeeAll}
            className="text-apple-blue dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none"
           >
            See All
           </button>
        )}
      </div>

      <div className="relative group">
        {/* Navigation Buttons - Visible on Hover (Desktop) */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0 hover:bg-white dark:hover:bg-black"
        >
          <ChevronLeft size={20} />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 pb-8 no-scrollbar snap-x scroll-pl-6"
        >
          {children}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};