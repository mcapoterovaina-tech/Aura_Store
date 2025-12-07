
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AppItem, User } from '../types';
import { useNavigate, Seo } from '../components/Seo';
import { ChevronLeft, Loader2, Package } from 'lucide-react';
import { Button } from '../components/Button';

interface PurchasedHistoryProps {
    user: User;
}

export const PurchasedHistory: React.FC<PurchasedHistoryProps> = ({ user }) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<AppItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (user.id) {
                setLoading(true);
                const data = await api.auth.getPurchasedHistory(user.id);
                setHistory(data);
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user.id]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
            <Seo title="Purchased History" />
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/profile')} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="ml-1 font-medium">Account</span>
                </button>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Purchased History</h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-slate-400" />
                    </div>
                ) : history.length > 0 ? (
                    <div className="bg-white dark:bg-night-card rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
                        {history.map((app, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <img src={app.iconUrl} className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/10" alt={app.name} />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">{app.name}</h4>
                                    <p className="text-sm text-slate-500">{app.category}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                                        {app.price === 0 ? 'Free' : `$${app.price}`}
                                    </span>
                                    <Button variant="ghost" size="sm" onClick={() => navigate(`/app/${app.id}`)}>
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                        <Package size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">No purchases found.</p>
                        <Button variant="secondary" className="mt-6" onClick={() => navigate('/')}>Browse Apps</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
