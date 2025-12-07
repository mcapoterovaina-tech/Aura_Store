
import React from 'react';
import { User } from '../../types';
import { Button } from '../Button';
import { MOCK_APPS } from '../../constants';
import { Settings, LogOut, Package, CreditCard, ChevronRight } from 'lucide-react';
import { useNavigate } from '../Seo';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, notify }) => {
  const navigate = useNavigate();
  
  // Filter apps that represent "My Apps"
  const myApps = MOCK_APPS.filter(app => user.library.includes(app.id));

  const handleOpenApp = (id: string) => {
    navigate(`/app/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Account</h1>

        <div className="bg-white dark:bg-night-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5 mb-8 flex items-center gap-6">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 dark:border-white/5 shadow-md" />
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
            <Button variant="secondary" onClick={onLogout} className="gap-2 bg-gray-100 dark:bg-white/10 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20">
                <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
            </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Menu */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-night-card rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm">
                    <MenuItem 
                        icon={<Package size={20} />} 
                        label="Purchased History" 
                        onClick={() => navigate('/account/history')}
                    />
                    <MenuItem 
                        icon={<CreditCard size={20} />} 
                        label="Subscriptions" 
                        onClick={() => navigate('/account/subscriptions')}
                    />
                    <MenuItem 
                        icon={<Settings size={20} />} 
                        label="Settings" 
                        hasBorder={false} 
                        onClick={() => navigate('/account/settings')}
                    />
                </div>
            </div>

            {/* Recent Apps */}
            <div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">My Apps</h3>
                 {myApps.length > 0 ? (
                    <div className="bg-white dark:bg-night-card rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-2">
                        {myApps.map(app => (
                            <div 
                                key={app.id} 
                                onClick={() => handleOpenApp(app.id)}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
                            >
                                <img src={app.iconUrl} alt={app.name} className="w-12 h-12 rounded-xl shadow-sm bg-gray-100 dark:bg-white/10" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-apple-blue transition-colors">{app.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Updated recently</p>
                                </div>
                                <Button variant="secondary" size="sm" className="px-4 py-1 h-8 text-xs font-bold bg-gray-100 dark:bg-white/10 dark:text-white">OPEN</Button>
                            </div>
                        ))}
                    </div>
                 ) : (
                     <div className="bg-white dark:bg-night-card rounded-2xl border border-gray-100 dark:border-white/5 p-8 text-center text-slate-400">
                         No apps installed yet.
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    hasBorder?: boolean;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, hasBorder = true, onClick }) => (
    <div 
        onClick={onClick}
        className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors ${hasBorder ? 'border-b border-gray-50 dark:border-white/5' : ''}`}
    >
        <div className="text-slate-400 dark:text-slate-500">{icon}</div>
        <span className="flex-1 font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
    </div>
);
