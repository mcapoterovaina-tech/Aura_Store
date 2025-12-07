
import { useState } from 'react';
import { User } from '../types';
import { api } from '../services/api';

export const useAuth = (notify: (msg: string, type: 'success' | 'error' | 'info') => void) => {
  const [user, setUser] = useState<User>({
    id: 'guest',
    name: 'Guest User',
    email: '',
    isLoggedIn: false,
    library: [],
    avatar: ''
  });

  // Updated login function to accept an optional User object
  // If provided, it sets the session state immediately.
  // If not (legacy call), it performs the default login logic.
  const login = async (userData?: User) => {
    try {
      if (userData) {
          setUser(userData);
          notify(`Welcome back, ${userData.name}!`, 'success');
      } else {
          // Default fallback behavior for simple login calls
          const loggedUser = await api.auth.login('alex.morgan@example.com', 'password');
          setUser(loggedUser);
          notify('Welcome back, Alex!', 'success');
      }
    } catch (error) {
      notify('Login failed. Check console.', 'error');
    }
  };

  const logout = async () => {
    await api.auth.logout();
    setUser({
        id: 'guest',
        name: 'Guest User',
        email: '',
        isLoggedIn: false,
        library: [],
        avatar: ''
    });
    notify('Signed out successfully.', 'info');
  };

  const updateUserLibrary = (newAppIds: string[]) => {
      setUser(prev => ({ 
          ...prev, 
          library: [...prev.library, ...newAppIds] 
      }));
  };

  return { user, login, logout, updateUserLibrary };
};
