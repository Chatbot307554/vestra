import { USE_MOCK_API, apiClient } from './apiClient';
import { mockPromotions } from '../mocks/dashboard';
import type { Product } from '../types';

export async function addToCart(product: Product, variantId: string, colour: string, size: string, quantity: number): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return;
  }
  await apiClient.post('/cart/items', { productId: product.id, variantId, colour, size, quantity });
}

export async function updateCartItem(itemId: string, quantity: number): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return;
  }
  await apiClient.patch(`/cart/items/${itemId}`, { quantity });
}

export async function removeFromCart(itemId: string): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return;
  }
  await apiClient.delete(`/cart/items/${itemId}`);
}

export async function applyPromoCode(code: string): Promise<{ valid: boolean; discount: number; message: string }> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    const promo = mockPromotions.find((p) => p.code.toUpperCase() === code.toUpperCase() && p.active);
    if (!promo) return { valid: false, discount: 0, message: 'Invalid or expired promo code' };
    return { valid: true, discount: promo.discountType === 'percentage' ? promo.value : 0, message: 'Promo code applied' };
  }
  const response = await apiClient.post('/cart/promo', { code });
  return response.data;
}

export async function clearCart(): Promise<void> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 100));
    return;
  }
  await apiClient.delete('/cart');
}
