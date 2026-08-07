import { USE_MOCK_API, apiClient } from './apiClient';
import { mockUsers, getUserById } from '../mocks/users';
import type { User } from '../types';

export async function login(email: string, _password: string): Promise<User> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Invalid email or password');
    return user;
  }
  const response = await apiClient.post('/auth/login', { email, password: _password });
  return response.data;
}

export async function register(data: { firstName: string; lastName: string; email: string; password: string; marketingOptIn: boolean }): Promise<User> {
  if (USE_MOCK_API) {
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
    return newUser;
  }
  const response = await apiClient.post('/auth/register', data);
  return response.data;
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return getUserById(userId) || null;
  }
  const response = await apiClient.get(`/auth/me/${userId}`);
  return response.data;
}

export async function forgotPassword(email: string): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 500));
    return;
  }
  await apiClient.post('/auth/forgot-password', { email });
}
