import { USE_MOCK_API, apiClient } from './apiClient';
import { getTryOnEligibleProducts } from '../mocks/products';
import { mockRequest } from '../mocks/mockDatabase';
import type { Product, VirtualTryOnResult } from '../types';

export async function getEligibleProducts(): Promise<Product[]> {
  if (USE_MOCK_API) return mockRequest(getTryOnEligibleProducts());
  const response = await apiClient.get('/virtual-try-on/eligible');
  return response.data;
}

export async function submitTryOn(
  productId: string,
  productName: string,
  productImage: string,
  colour: string
): Promise<VirtualTryOnResult> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 3500));
    return {
      id: `vto-${Date.now()}`,
      productId,
      productName,
      productImage,
      resultImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43a?w=800&q=80',
      colour,
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
  }
  const formData = new FormData();
  formData.append('productId', productId);
  formData.append('colour', colour);
  const response = await apiClient.post('/virtual-try-on', formData);
  return response.data;
}

export const vtoProcessingMessages = [
  'Preparing your image',
  'Applying the selected garment',
  'Finishing your preview',
];
