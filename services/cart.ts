
import { AppItem } from '../types';
import { client } from './config';

export const checkout = async (items: AppItem[], userId: string): Promise<boolean> => {
  try {
    // Real API Call
    await client('/checkout', {
      method: 'POST',
      body: JSON.stringify({ userId, items: items.map(i => i.id) })
    });
    return true;
  } catch (error) {
    console.warn("[API] Checkout failed (Backend offline)", error);
    return false;
  }
};

export const subscribe = async (userId: string, planId: string): Promise<boolean> => {
  try {
    await client('/subscriptions/subscribe', {
      method: 'POST',
      body: JSON.stringify({ userId, planId })
    });
    return true;
  } catch (error) {
    console.warn("[API] Subscription failed (Backend offline)", error);
    return false;
  }
};
