import React from 'react';
import { AppItem } from '../../types';

interface AppInfoProps {
  app: AppItem;
}

export const AppInfo: React.FC<AppInfoProps> = ({ app }) => {
  return (
    <div className="grid md:grid-cols-3 gap-16 mb-20">
        <div className="md:col-span-2">
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Description</h2>
             <p className="text-slate-600 dark:text-slate-300 leading-8 text-lg whitespace-pre-line">
                {app.description}
             </p>
        </div>
         <div>
            <div className="bg-gray-50/50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-6 text-xl">Information</h3>
                <dl className="space-y-5 text-sm">
                    <div className="flex justify-between py-3 border-b border-gray-200/60 dark:border-white/10">
                        <dt className="text-slate-500 dark:text-slate-400">Provider</dt>
                        <dd className="text-slate-900 dark:text-white font-medium">{app.developer}</dd>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200/60 dark:border-white/10">
                        <dt className="text-slate-500 dark:text-slate-400">Size</dt>
                        <dd className="text-slate-900 dark:text-white font-medium">{app.size}</dd>
                    </div>
                     <div className="flex justify-between py-3 border-b border-gray-200/60 dark:border-white/10">
                        <dt className="text-slate-500 dark:text-slate-400">Category</dt>
                        <dd className="text-slate-900 dark:text-white font-medium">{app.category}</dd>
                    </div>
                     <div className="flex justify-between py-3">
                        <dt className="text-slate-500 dark:text-slate-400">Compatibility</dt>
                        <dd className="text-slate-900 dark:text-white font-medium">
                            {app.platforms?.join(', ') || 'Web, iOS, Android'}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
  );
};