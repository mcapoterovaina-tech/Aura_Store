
import React, { useState, useEffect } from 'react';
import { AppItem, User } from '../types';
import { Button } from '../components/Button';
import { Trash2, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from '../components/Seo';
import { api } from '../services/api';

interface CartProps {
  items: AppItem[];
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
  user?: User; 
}

export const Cart: React.FC<CartProps> = ({ items, removeFromCart, clearCart, notify, user }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  
  const [taxAmount, setTaxAmount] = useState(0);
  const [isCalculatingTax, setIsCalculatingTax] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch Tax from Backend
  useEffect(() => {
    const fetchTax = async () => {
        if (subtotal === 0) {
            setTaxAmount(0);
            return;
        }
        setIsCalculatingTax(true);
        const taxData = await api.tax.calculateTax(subtotal, user?.id);
        setTaxAmount(taxData.amount);
        setIsCalculatingTax(false);
    };

    // Debounce to avoid too many requests if cart changes rapidly
    const timeout = setTimeout(fetchTax, 500);
    return () => clearTimeout(timeout);
  }, [subtotal, user?.id]);

  const total = subtotal + taxAmount;

  const handleCheckout = async () => {
      setIsProcessing(true);
      
      const success = await api.cart.checkout(items, user?.id || 'guest');
      
      setIsProcessing(false);
      
      if (success) {
          clearCart();
      } else {
          notify('Checkout failed. Please try again.', 'error');
      }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 animate-fade-in">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Your Bag</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl animate-scale-in border border-gray-100 dark:border-white/5">
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-6">Your bag is empty.</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8 animate-slide-up">
          <div className="bg-white dark:bg-night-card rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft overflow-hidden">
             {items.map((item) => (
               <div key={item.id} className="flex items-center gap-4 p-6 border-b border-gray-50 dark:border-white/5 last:border-0">
                  <img src={item.iconUrl} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100 dark:bg-white/10" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{item.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-white mb-2">
                        {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}
                    </div>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors text-sm flex items-center gap-1 ml-auto"
                    >
                        <Trash2 size={14} /> Remove
                    </button>
                  </div>
               </div>
             ))}
          </div>

          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
             <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-slate-400">Tax</span>
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                   {isCalculatingTax && <Loader2 size={14} className="animate-spin text-apple-blue" />}
                   <span>${taxAmount.toFixed(2)}</span>
                </div>
             </div>
             <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
             </div>
             <Button 
                size="lg" 
                fullWidth 
                className={`flex items-center justify-center gap-2 transition-all ${isProcessing ? 'bg-green-500 hover:bg-green-600' : ''}`}
                onClick={handleCheckout}
                disabled={isProcessing || isCalculatingTax}
             >
                {isProcessing ? (
                    <>
                        <CheckCircle size={18} className="animate-pulse" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Lock size={18} />
                        Checkout
                    </>
                )}
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};
