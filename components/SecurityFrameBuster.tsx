
import React, { useEffect, useState } from 'react';
import { ShieldAlert, EyeOff } from 'lucide-react';

export const SecurityFrameBuster: React.FC = () => {
  const [isFramed, setIsFramed] = useState(false);
  const [bypassed, setBypassed] = useState(false);

  useEffect(() => {
    // Check if window.self is different from window.top to detect iframe usage
    try {
      if (window.self !== window.top) {
        setIsFramed(true);
      }
    } catch (e) {
      // Cross-origin access might block window.top access, implying an iframe
      setIsFramed(true);
    }
  }, []);

  if (!isFramed || bypassed) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center p-4 text-center animate-fade-in">
      <ShieldAlert size={64} className="text-red-500 mb-6 animate-pulse" />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Security Alert</h1>
      <p className="text-slate-600 dark:text-slate-300 max-w-md text-lg leading-relaxed mb-8">
        For your protection, Aura Store cannot be displayed inside another website to prevent clickjacking attacks.
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => window.top!.location = window.self.location.href}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-lg shadow-red-500/30"
        >
          Open Safely in New Tab
        </button>

        {/* Development Bypass Button - Only visible in development */}
        {import.meta.env.DEV && (
          <button
            onClick={() => setBypassed(true)}
            className="flex items-center justify-center gap-2 px-6 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium transition-colors"
          >
            <EyeOff size={16} />
            Ignore (Development Mode)
          </button>
        )}
      </div>
    </div>
  );
};
