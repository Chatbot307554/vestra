import { USE_MOCK_API, apiClient } from './apiClient';
import type { Product } from '../types';

export async function toggleWishlist(productId: string): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return;
  }
  await apiClient.post('/wishlist/toggle', { productId });
}

export async function getWishlist(): Promise<Product[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return [];
  }
  const response = await apiClient.get('/wishlist');
  return response.data;
}
