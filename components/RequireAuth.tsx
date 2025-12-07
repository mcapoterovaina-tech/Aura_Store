
import React, { useEffect } from 'react';
import { User } from '../types';
import { useNavigate } from './Seo';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  user: User;
  children: React.ReactNode;
  redirectTo?: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ user, children, redirectTo = '/profile' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      // Redirect to login page if not authenticated
      navigate(redirectTo);
    }
  }, [user.isLoggedIn, navigate, redirectTo]);

  // While checking or redirecting, show nothing or a loader
  if (!user.isLoggedIn) {
    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-black">
             <Loader2 className="animate-spin text-apple-blue w-8 h-8" />
        </div>
    ); 
  }

  // If logged in, render the protected content
  return <>{children}</>;
};
