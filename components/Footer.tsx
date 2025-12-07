import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { FooterSection, FooterLink as FooterLinkType } from '../types';
import { Link } from './Seo';

export const Footer: React.FC = () => {
  const [sections, setSections] = useState<FooterSection[]>([]);

  useEffect(() => {
    const loadFooter = async () => {
      const data = await api.getFooter();
      setSections(data);
    };
    loadFooter();
  }, []);

  return (
    <footer className="bg-gray-50 dark:bg-night-card pt-20 pb-12 border-t border-gray-200 dark:border-white/5 mt-auto transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        
        {/* Dynamic Columns from API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {sections.map((section) => (
            <FooterColumn 
              key={section.id} 
              title={section.title} 
              links={section.links} 
            />
          ))}
          {sections.length === 0 && (
             <div className="col-span-4 text-center text-slate-400 py-10">
                {/* Sections loading or empty... */}
             </div>
          )}
        </div>
        
        {/* Bottom Links (Functional) */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 font-medium">
          <p>Copyright © 2024 Aura Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <FooterLink text="Privacy Policy" to="/legal/privacy" />
            <FooterLink text="Terms of Use" to="/legal/terms" />
            <FooterLink text="Sales and Refunds" to="/legal/sales" />
            <FooterLink text="Legal" to="/legal/legal" />
            <FooterLink text="Site Map" to="/legal/sitemap" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn: React.FC<{ title: string; links: FooterLinkType[] }> = ({ title, links }) => (
  <div className="animate-fade-in">
    <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm tracking-tight">{title}</h4>
    <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
      {links.length > 0 && links.map((link, idx) => (
            <li key={idx}>
                <Link 
                  to={link.url}
                  className="hover:underline hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors block py-0.5"
                >
                  {link.label}
                </Link>
            </li>
      ))}
    </ul>
  </div>
);

const FooterLink: React.FC<{ text: string; to: string }> = ({ text, to }) => (
  <Link to={to} className="hover:underline hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors px-1 py-1">
    {text}
  </Link>
);