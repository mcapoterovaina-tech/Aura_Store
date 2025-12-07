
import { User, AppItem } from '../types';
import { client, setAccessToken } from './config';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Use secure client
    const response = await client('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    });
    
    // Capture the Access Token into memory
    // Assumes backend returns structure: { user: User, accessToken: string }
    if (response.accessToken) {
        setAccessToken(response.accessToken);
    }
    
    // Return the user object (fallback handles flattened structure if backend is simple)
    return response.user || response;
  } catch (error) {
    console.error("Login failed (Backend offline or invalid credentials)", error);
    throw new Error('Login failed');
  }
};

export const verifyMfa = async (email: string, code: string): Promise<User> => {
  try {
     // Simulated MFA verification endpoint
     const response = await client('/auth/mfa/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code })
     });
     
     if (response.accessToken) {
         setAccessToken(response.accessToken);
     }
     
     return response.user || response;
  } catch (error) {
     console.error("MFA Verification failed", error);
     throw new Error('Invalid code');
  }
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const response = await client('/auth/register', { 
      method: 'POST', 
      body: JSON.stringify({ name, email, password }) 
    });
    
    if (response.accessToken) {
        setAccessToken(response.accessToken);
    }

    return response.user || response;
  } catch (error) {
    console.error("Registration failed", error);
    throw new Error('Registration failed');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await client('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error("Logout failed (Backend offline)", error);
  } finally {
    // Critical: Clear the token from memory on logout
    setAccessToken(null);
  }
};

export const getPurchasedHistory = async (userId: string): Promise<AppItem[]> => {
  try {
    const data = await client(`/users/${userId}/history`);
    
    return data.map((item: any) => ({
      ...item,
      price: item.price ?? 0,
      rating: item.rating ?? 0,
    }));
  } catch (error) {
    console.warn("API Error (History): Backend offline.", error);
    return [];
  }
};

export const getSubscriptions = async (userId: string): Promise<any[]> => {
  try {
    return await client(`/users/${userId}/subscriptions`);
  } catch (error) {
    console.warn("API Error (Subscriptions): Backend offline.", error);
    return [];
  }
};

export const updateProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  try {
    return await client(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Profile update failed", error);
    throw error;
  }
};
