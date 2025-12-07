import React from 'react';
import { Button } from '../Button';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden" id="top">
      
      {/* Living Background Animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-60 dark:opacity-40">
        <div className="absolute top-0 left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-blue-300 dark:bg-blue-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-10 text-center md:text-left">
          <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold uppercase tracking-widest mb-8 animate-fade-in shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Editor's Choice
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.05] animate-slide-up">
            Creativity <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Unleashed.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed animate-slide-up delay-100">
            Discover the most powerful tools designed to help you create, edit, and publish your masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up delay-200">
            <Button 
              size="lg" 
              className="shadow-xl shadow-blue-500/20 active:scale-95 transition-transform bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200"
              onClick={onExplore}
            >
              Explore Collection
            </Button>
          </div>
        </div>
        
        <div className="relative mt-12 md:mt-0 animate-scale-in group perspective-1000">
          <img 
            src="https://picsum.photos/id/180/800/800" 
            alt="Hero App Showcase" 
            className="relative z-10 rounded-[2.5rem] shadow-2xl rotate-2 group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-700 ease-out mx-auto max-w-[85%] md:max-w-full border border-white/50 dark:border-white/10 object-cover"
          />
        </div>
      </div>
    </section>
  );
};