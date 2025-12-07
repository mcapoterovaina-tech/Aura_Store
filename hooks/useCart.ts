
import { useState } from 'react';
import { AppItem, User } from '../types';

export const useCart = (
    user: User, 
    notify: (msg: string, type: 'success' | 'error' | 'info') => void,
    onPurchaseSuccess: (newAppIds: string[]) => void
) => {
  const [cartItems, setCartItems] = useState<AppItem[]>([]);

  const addToCart = (app: AppItem) => {
    if (user.library.includes(app.id)) {
        notify('You already own this app.', 'info');
        return;
    }

    if (cartItems.find(item => item.id === app.id)) {
      notify('Item already in your bag.', 'info');
    } else {
      setCartItems([...cartItems, app]);
      notify(`${app.name} added to bag.`, 'success');
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    const newIds = cartItems.map(c => c.id);
    setCartItems([]);
    notify('Purchase successful! Apps added to your library.', 'success');
    onPurchaseSuccess(newIds);
  };

  return { cartItems, addToCart, removeFromCart, clearCart };
};
