import React, { useRef, useEffect } from 'react';
import { Link as LinkIcon, MessageCircle, Facebook, Linkedin } from 'lucide-react';
import { shareContent, SharePlatform } from '../utils/shareUtils';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // The text to share (e.g., "Check out this app")
  url?: string;
  onCopySuccess: () => void;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ isOpen, onClose, title, url, onCopySuccess }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleShare = (platform: SharePlatform) => {
      shareContent(platform, title, url, onCopySuccess);
      onClose(); // Close menu after selection (except copy, but shareContent logic handles copy async)
  };

  return (
    <div ref={menuRef} className="absolute top-full right-0 mt-3 w-64 bg-white/90 dark:bg-night-card/90 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/5 p-2 z-50 animate-scale-in origin-top-right">
            <button onClick={() => handleShare('copy')} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium">
            <LinkIcon size={18} /> Copy Link
            </button>
            <div className="h-px bg-gray-200/50 dark:bg-white/10 my-1 mx-2"></div>
            <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium">
            <MessageCircle size={18} className="text-green-500" /> WhatsApp
            </button>
            <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium">
            <Facebook size={18} className="text-blue-600" /> Facebook
            </button>
            <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium">
            <Linkedin size={18} className="text-blue-700" /> LinkedIn
            </button>
    </div>
  );
};