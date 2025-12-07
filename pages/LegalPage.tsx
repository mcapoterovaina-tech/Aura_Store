import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '../components/Seo';
import { api } from '../services/api';
import { LegalDocument } from '../types';
import { Seo } from '../components/Seo';
import { ChevronLeft, Loader2, Server } from 'lucide-react';
import { Button } from '../components/Button';
import { sanitizeHtml } from '../utils/security';

export const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    if (slug) {
      // Reset state when slug changes
      setDocument(null);
      const data = await api.getPageContent(slug);
      setDocument(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <Loader2 className="animate-spin text-apple-blue w-8 h-8" />
      </div>
    );
  }

  // ELEGANT EMPTY STATE: Waiting for Backend
  if (!document) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center dark:bg-black animate-fade-in">
        <div className="max-w-lg w-full text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                     <Server size={32} className="text-apple-blue dark:text-blue-400 opacity-50" />
                </div>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 capitalize tracking-tight">
              Waiting for Information
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed max-w-sm mx-auto">
              We are attempting to retrieve the 
              <span className="font-semibold text-slate-700 dark:text-slate-300 mx-1 capitalize">
                {slug?.replace('-', ' ')}
              </span> 
              data from our servers. Please check your connection or try again later.
            </p>

            <div className="flex justify-center gap-4">
                 <Button variant="secondary" onClick={() => navigate('/')}>
                    Go Back
                 </Button>
                 <Button onClick={fetchContent} className="shadow-lg shadow-blue-500/10">
                    Retry Connection
                 </Button>
            </div>
        </div>
      </div>
    );
  }

  const isSitemap = slug === 'sitemap';

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black bg-white transition-colors">
      <Seo title={document.title} />
      
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-10 transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="ml-1 font-medium">Back</span>
        </button>

        <header className="mb-16 pb-8 border-b border-gray-100 dark:border-white/10">
            <span className="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Legal Document
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{document.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Last Updated: {document.lastUpdated}</p>
        </header>

        <div className={`
            ${isSitemap ? 'grid md:grid-cols-3 gap-12' : 'prose prose-lg prose-slate dark:prose-invert max-w-none'}
        `}>
            {document.sections.map((section, index) => (
                <section key={index} className={isSitemap ? 'mb-0' : 'mb-16'}>
                    {section.heading && (
                        <h2 className={`font-bold text-slate-900 dark:text-white ${isSitemap ? 'text-xl mb-6 border-b border-gray-100 dark:border-white/5 pb-2' : 'text-2xl mb-6'}`}>
                            {section.heading}
                        </h2>
                    )}
                    
                    {section.imageUrl && (
                        <div className="my-8 rounded-3xl overflow-hidden shadow-soft border border-gray-100 dark:border-white/10">
                            <img src={section.imageUrl} alt={section.heading || 'Section image'} className="w-full h-auto object-cover" />
                        </div>
                    )}
                    
                    {section.videoUrl && (
                         <div className="my-8 rounded-3xl overflow-hidden shadow-soft border border-gray-100 dark:border-white/10 aspect-video bg-black">
                            <video controls className="w-full h-full">
                                <source src={section.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                    {/* SECURITY: Content is now sanitized before rendering */}
                    <div 
                        className={`text-slate-600 dark:text-slate-300 ${isSitemap ? 'space-y-3' : 'leading-8 whitespace-pre-line'}`}
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} 
                    />
                </section>
            ))}
        </div>
      </div>
    </div>
  );
};