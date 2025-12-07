
import React, { useState } from 'react';
import { Button } from '../Button';
import { UserPlus, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

interface RegisterFormProps {
  onRegisterSuccess: (email: string, pass: string) => void;
  onSwitchToLogin: () => void;
  notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  password?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin, notify }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Validation State
  const [touched, setTouched] = useState<TouchedFields>({});
  
  // Helper to validate a single field value
  const getFieldError = (field: keyof ValidationErrors, value: string): string | undefined => {
    switch (field) {
      case 'name':
        return !value.trim() ? 'Full Name is required' : undefined;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || !emailRegex.test(value) ? 'Please enter a valid email address' : undefined;
      case 'password':
        return !value || value.length < 8 ? 'Password must be at least 8 characters long' : undefined;
      default:
        return undefined;
    }
  };

  // Derived errors based on current state
  const errors: ValidationErrors = {
    name: getFieldError('name', name),
    email: getFieldError('email', email),
    password: getFieldError('password', password),
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    // Mark all as touched on submit
    setTouched({ name: true, email: true, password: true });

    if (errors.name || errors.email || errors.password) {
        notify('Please fix the errors below.', 'error');
        return;
    }
    
    setLoading(true);
    try {
        await api.auth.register(name, email, password);
        notify('Account created successfully!', 'success');
        onRegisterSuccess(email, password);
    } catch (e) {
        notify('Registration failed. Please try again.', 'error');
    }
    setLoading(false);
  };

  // Helper to get input classes based on validation state
  const getInputClass = (field: keyof ValidationErrors) => {
    const isError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field];
    
    const baseClass = "w-full px-5 py-4 rounded-2xl border outline-none transition-all font-medium";
    const bgClass = "bg-gray-50 dark:bg-white/5 text-slate-900 dark:text-white";
    
    if (isError) {
      return `${baseClass} ${bgClass} border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10`;
    }
    if (isValid) {
      return `${baseClass} ${bgClass} border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10`;
    }
    return `${baseClass} ${bgClass} border-gray-200 dark:border-white/10 focus:border-apple-blue focus:ring-4 focus:ring-blue-500/10`;
  };

  return (
    <div className="w-full max-w-md mx-auto z-10 animate-fade-in">
        <div className="text-center md:text-left mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-teal-500 rounded-[1.5rem] shadow-lg flex items-center justify-center mb-6 mx-auto md:mx-0 animate-scale-in">
                <UserPlus className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Create ID</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Join Aura Store to manage your library.</p>
        </div>
        
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Full Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="John Doe" 
                    className={getInputClass('name')}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-slide-down">
                    <AlertCircle size={10} /> {errors.name}
                  </p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="name@example.com" 
                    className={getInputClass('email')}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-slide-down">
                    <AlertCircle size={10} /> {errors.email}
                  </p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="••••••••" 
                    className={getInputClass('password')}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1 animate-slide-down">
                    <AlertCircle size={10} /> {errors.password}
                  </p>
                )}
            </div>
            
            <Button fullWidth size="lg" onClick={handleSubmit} disabled={loading} className="mt-4 text-lg h-14 shadow-xl shadow-green-500/20 bg-green-600 hover:bg-green-700">
                {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </div>
        
        <div className="mt-10 text-center md:text-left">
            <p className="text-sm text-slate-400">
                Already have an ID? <span onClick={onSwitchToLogin} className="text-apple-blue font-semibold cursor-pointer hover:underline">Sign In.</span>
            </p>
        </div>
    </div>
  );
};
