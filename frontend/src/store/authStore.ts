import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { demoCustomer, demoAdmin, mockUsers } from '../mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginDemo: (role: 'customer' | 'admin') => void;
  register: (data: { firstName: string; lastName: string; email: string; password: string; marketingOptIn: boolean }) => Promise<User>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 400));
        const found = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!found) throw new Error('Invalid email or password');
        set({ user: found, isAuthenticated: true });
        return found;
      },

      loginDemo: (role) => {
        const user = role === 'admin' ? demoAdmin : demoCustomer;
        set({ user, isAuthenticated: true });
      },

      register: async (data) => {
        await new Promise((r) => setTimeout(r, 500));
        const newUser: User = {
          id: `u${Date.now()}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'customer',
          addresses: [],
          wishlistIds: [],
          createdAt: new Date().toISOString(),
          isActive: true,
          marketingOptIn: data.marketingOptIn,
        };
        set({ user: newUser, isAuthenticated: true });
        return newUser;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    { name: 'vestra-auth' }
  )
);
