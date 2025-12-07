
import React, { useState } from 'react';
import { User } from '../types';
import { GreetingCharacter } from '../components/profile/GreetingCharacter';
import { LoginForm } from '../components/profile/LoginForm';
import { RegisterForm } from '../components/profile/RegisterForm';
import { UserProfile } from '../components/profile/UserProfile';
import { api } from '../services/api';

interface ProfileProps {
  user: User;
  login: () => void;
  logout: () => void;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, login, logout, notify }) => {
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleRegisterSuccess = async (email: string, pass: string) => {
    // Automatically login after register, or switch to login view
    await api.auth.login(email, pass);
    login(); // Trigger app state update
  };
  
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 dark:bg-black pt-20">
        <div className="w-full max-w-6xl relative flex items-center justify-center min-h-[600px]">
            
            {/* Left Column: Animated Character (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500" style={{ transform: `translateY(-50%) ${view === 'register' ? 'scale(0.9) translateX(-50px)' : 'scale(1)'}` }}>
                {/* Character */}
                <div className="z-10 transform scale-110">
                    <GreetingCharacter />
                </div>
                <p className="mt-8 text-slate-400 font-medium text-sm tracking-wide uppercase opacity-60">Aura Store Assistant</p>
            </div>

            {/* Right Column: Form Component */}
            {view === 'login' ? (
                <div className="w-full max-w-md">
                     <LoginForm onLogin={login} />
                     <div className="mt-10 text-center md:text-left">
                        <p className="text-sm text-slate-400">
                            Don't have an ID? <span onClick={() => setView('register')} className="text-apple-blue font-semibold cursor-pointer hover:underline">Create one now.</span>
                        </p>
                    </div>
                </div>
            ) : (
                <RegisterForm 
                    onRegisterSuccess={handleRegisterSuccess} 
                    onSwitchToLogin={() => setView('login')}
                    notify={notify}
                />
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50/50 dark:bg-black animate-fade-in">
        <UserProfile user={user} onLogout={logout} notify={notify} />
    </div>
  );
};
