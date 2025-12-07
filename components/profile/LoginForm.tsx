
import React, { useState } from 'react';
import { Button } from '../Button';
import { Smartphone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { User } from '../../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentialsSubmit = async () => {
    setError('');
    setLoading(true);
    
    // Simulate MFA check for specific email
    if (email === 'mfa@aura.com') {
        // In a real app, the backend would return a specific code (e.g. 202 Accepted) or flag
        setTimeout(() => {
            setLoading(false);
            setStep('mfa');
        }, 1000);
        return;
    }

    try {
        const user = await api.auth.login(email, password);
        onLogin(user);
    } catch (e) {
        setError('Invalid credentials. Try "mfa@aura.com" to test 2FA.');
        setLoading(false);
    }
  };

  const handleMfaSubmit = async () => {
    setError('');
    setLoading(true);
    try {
        const user = await api.auth.verifyMfa(email, mfaCode);
        onLogin(user);
    } catch (e) {
        setError('Invalid verification code.');
        setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto z-10 animate-fade-in">
        <div className="text-center md:text-left mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-[1.5rem] shadow-lg flex items-center justify-center mb-6 mx-auto md:mx-0 animate-scale-in">
                {step === 'credentials' ? <Smartphone className="text-white w-10 h-10" /> : <Lock className="text-white w-10 h-10" />}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {step === 'credentials' ? 'Sign in' : 'Security Check'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
                {step === 'credentials' ? 'Access your library and discover new apps.' : 'Enter the code sent to your device.'}
            </p>
        </div>
        
        {step === 'credentials' ? (
            <div className="space-y-5 animate-slide-up">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com" 
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm ml-1">{error}</p>}

                <Button fullWidth size="lg" onClick={handleCredentialsSubmit} disabled={loading} className="mt-4 text-lg h-14 shadow-xl shadow-blue-500/20">
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                </Button>
            </div>
        ) : (
            <div className="space-y-5 animate-slide-up">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Verification Code</label>
                    <input 
                        type="text" 
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        placeholder="123456" 
                        maxLength={6}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-center text-2xl tracking-widest"
                        autoFocus
                    />
                </div>

                {error && <p className="text-red-500 text-sm ml-1 text-center">{error}</p>}

                <Button fullWidth size="lg" onClick={handleMfaSubmit} disabled={loading} className="mt-4 text-lg h-14 shadow-xl shadow-purple-500/20 bg-purple-600 hover:bg-purple-700">
                    {loading ? <Loader2 className="animate-spin" /> : 'Verify Code'}
                </Button>
                
                <button 
                    onClick={() => { setStep('credentials'); setError(''); }} 
                    className="w-full text-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm mt-4 transition-colors"
                >
                    Back to login
                </button>
            </div>
        )}
    </div>
  );
};
