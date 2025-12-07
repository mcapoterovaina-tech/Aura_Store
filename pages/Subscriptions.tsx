
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { useNavigate, Seo } from '../components/Seo';
import { ChevronLeft, Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';

interface SubscriptionsProps {
    user: User;
}

export const Subscriptions: React.FC<SubscriptionsProps> = ({ user }) => {
    const navigate = useNavigate();
    const [subs, setSubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubs = async () => {
            if (user.id) {
                setLoading(true);
                const data = await api.auth.getSubscriptions(user.id);
                setSubs(data);
                setLoading(false);
            }
        };
        fetchSubs();
    }, [user.id]);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
            <Seo title="Subscriptions" />
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/profile')} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="ml-1 font-medium">Account</span>
                </button>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Subscriptions</h1>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-slate-400" />
                    </div>
                ) : subs.length > 0 ? (
                    <div className="grid gap-6">
                        {subs.map((sub, index) => (
                            <div key={index} className="bg-white dark:bg-night-card p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{sub.planName || 'Aura Arcade'}</h3>
                                        <p className="text-slate-500 text-sm">Active &bull; Renews {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <Button variant="secondary" size="sm">Manage</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl">
                        <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">No active subscriptions.</p>
                        <Button className="mt-6" onClick={() => navigate('/arcade')}>Explore Arcade</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
