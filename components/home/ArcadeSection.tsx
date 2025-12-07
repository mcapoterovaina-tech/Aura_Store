import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Button } from '../Button';

interface ArcadeSectionProps {
  onAction: () => void;
}

export const ArcadeSection: React.FC<ArcadeSectionProps> = ({ onAction }) => {
  return (
    <section id="arcade" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-20 relative overflow-hidden shadow-2xl shadow-slate-900/20 text-white group">
        
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[80px] opacity-30 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6">
            <Gamepad2 size={18} />
            <span>Aura Arcade</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Play <br/> Extraordinary.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
            Dive into a curated collection of groundbreaking games. No ads. No in-app purchases. Just pure gameplay.
          </p>
          <Button 
            variant="glass" 
            size="lg" 
            className="px-10 py-4 text-base active:scale-95 transition-transform"
            onClick={onAction}
          >
            Start Playing
          </Button>
        </div>
        
        {/* Floating Cards Animation */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-[450px] perspective-1000">
           <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 mb-8 rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl cursor-default">
             <div className="flex items-center gap-5">
               <img src="https://picsum.photos/id/111/100/100" className="w-16 h-16 rounded-2xl shadow-lg" alt="Game icon" />
               <div>
                 <div className="font-bold text-xl">Velocity</div>
                 <div className="text-sm text-slate-300">Racing Simulator</div>
               </div>
             </div>
           </div>
           <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 ml-12 rotate-[6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-xl cursor-default">
              <div className="flex items-center gap-5">
               <img src="https://picsum.photos/id/112/100/100" className="w-16 h-16 rounded-2xl shadow-lg" alt="Game icon" />
               <div>
                 <div className="font-bold text-xl">Space Odyssey</div>
                 <div className="text-sm text-slate-300">Adventure</div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};