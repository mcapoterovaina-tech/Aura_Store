
import React, { useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';
import { useNavigate, Seo } from '../components/Seo';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '../components/Button';

interface SettingsProps {
    user: User;
    notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({ user, notify }) => {
    const navigate = useNavigate();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.auth.updateProfile(user.id, { name, email });
            notify('Profile updated successfully', 'success');
        } catch (e) {
            notify('Failed to update profile', 'error');
        }
        setSaving(false);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in dark:bg-black">
            <Seo title="Settings" />
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate('/profile')} className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="ml-1 font-medium">Account</span>
                </button>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Settings</h1>

                <div className="bg-white dark:bg-night-card p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-apple-blue outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-apple-blue outline-none"
                        />
                    </div>

                    <div className="pt-4">
                        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
