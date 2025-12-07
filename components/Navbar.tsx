
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User as UserIcon, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from './Seo';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  user: User;
  onSearchClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, user, onSearchClick, isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleNavigation = (destination: string) => {
    if (destination.startsWith('/')) {
        navigate(destination);
    } else {
        // Section scroll logic for Home
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(destination);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const element = document.getElementById(destination);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled || mobileMenuOpen 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-gray-200/50 dark:border-white/10 shadow-sm' 
            : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-bold tracking-tight flex items-center" aria-label="Aura Store Home">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                Aura
              </span>
              <span className="text-slate-400 font-light ml-1">Store</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('top')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors focus:outline-none">Discover</button>
            <button onClick={() => handleNavigation('categories')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors focus:outline-none">Categories</button>
            <button onClick={() => handleNavigation('arcade')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors focus:outline-none">Arcade</button>
            <button onClick={() => handleNavigation('/notice')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-apple-blue dark:hover:text-apple-blue transition-colors focus:outline-none">Notice</button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none text-slate-500 dark:text-slate-400"
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
                onClick={onSearchClick} 
                className="relative group focus:outline-none"
                aria-label="Open Search"
            >
                <Search className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </button>
            <Link to="/cart" className="relative group" aria-label={`Shopping Bag, ${cartCount} items`}>
              <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white dark:border-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/profile" aria-label="User Profile">
              {user.isLoggedIn ? (
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 hover:border-apple-blue transition-colors object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                     <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300" aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={onSearchClick} aria-label="Open Search">
                <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
             </button>
             <Link to="/cart" className="relative" aria-label={`Shopping Bag, ${cartCount} items`}>
              <ShoppingBag className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 dark:text-slate-300 focus:outline-none"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-night-card border-b border-gray-200 dark:border-white/10 px-4 py-6 shadow-xl flex flex-col space-y-4 animate-slide-down">
            <button onClick={() => handleNavigation('top')} className="text-left text-lg font-medium text-slate-900 dark:text-white">Discover</button>
            <button onClick={() => handleNavigation('categories')} className="text-left text-lg font-medium text-slate-900 dark:text-white">Categories</button>
            <button onClick={() => handleNavigation('arcade')} className="text-left text-lg font-medium text-slate-900 dark:text-white">Arcade</button>
            <button onClick={() => handleNavigation('/notice')} className="text-left text-lg font-medium text-slate-900 dark:text-white">Notice</button>
            <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
            <Link to="/profile" className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                {user.isLoggedIn ? (
                  <>
                     <img src={user.avatar} className="w-6 h-6 rounded-full" alt="" aria-hidden="true" />
                     <span>My Account</span>
                  </>
                ) : (
                  <>
                    <UserIcon size={20} />
                    <span>Sign In</span>
                  </>
                )}
            </Link>
        </div>
      )}
    </nav>
  );
};
