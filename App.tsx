
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from './components/Seo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AppDetails } from './pages/AppDetails';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Notice } from './pages/Notice';
import { Arcade } from './pages/Arcade';
import { CategoryPage } from './pages/CategoryPage';
import { CollectionPage } from './pages/CollectionPage';
import { LegalPage } from './pages/LegalPage';
import { PurchasedHistory } from './pages/PurchasedHistory';
import { Subscriptions } from './pages/Subscriptions';
import { SettingsPage } from './pages/Settings';
import { ToastContainer } from './components/Toast';
import { SearchOverlay } from './components/SearchOverlay';
import { RequireAuth } from './components/RequireAuth';
import { SecurityFrameBuster } from './components/SecurityFrameBuster';

// Custom Hooks
import { useTheme } from './hooks/useTheme';
import { useNotification } from './hooks/useNotification';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 1. Initialize Hooks
  const { isDarkMode, toggleTheme } = useTheme();
  const { notifications, addNotification, removeNotification } = useNotification();
  const { user, login, logout, updateUserLibrary } = useAuth(addNotification);
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart(user, addNotification, updateUserLibrary);

  return (
    <Router>
      <SecurityFrameBuster />
      <div className="font-sans antialiased text-slate-900 dark:text-white bg-white dark:bg-black min-h-screen flex flex-col transition-colors duration-200">
        <Navbar 
            cartCount={cartItems.length} 
            user={user} 
            onSearchClick={() => setIsSearchOpen(true)}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
        />
        
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ToastContainer notifications={notifications} removeNotification={removeNotification} />

        <div className="flex-grow">
            <Routes>
            <Route path="/" element={<Home addToCart={addToCart} notify={addNotification} />} />
            <Route path="/app/:id" element={<AppDetails addToCart={addToCart} user={user} notify={addNotification} />} />
            <Route path="/cart" element={
                <Cart 
                items={cartItems} 
                removeFromCart={removeFromCart} 
                clearCart={clearCart} 
                notify={addNotification}
                user={user}
                />
            } />
            <Route path="/profile" element={
                <Profile user={user} login={login} logout={logout} notify={addNotification} />
            } />
            
            {/* Protected Routes */}
            <Route path="/account/history" element={
                <RequireAuth user={user}>
                   <PurchasedHistory user={user} />
                </RequireAuth>
            } />
            <Route path="/account/subscriptions" element={
                <RequireAuth user={user}>
                   <Subscriptions user={user} />
                </RequireAuth>
            } />
            <Route path="/account/settings" element={
                <RequireAuth user={user}>
                   <SettingsPage user={user} notify={addNotification} />
                </RequireAuth>
            } />

            <Route path="/notice" element={
                <Notice notify={addNotification} />
            } />
            <Route path="/arcade" element={
                <Arcade addToCart={addToCart} />
            } />
            <Route path="/category/:id" element={
                <CategoryPage addToCart={addToCart} />
            } />
            <Route path="/collection/:type" element={
                <CollectionPage addToCart={addToCart} />
            } />
            <Route path="/legal/:slug" element={
                <LegalPage />
            } />
            </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
