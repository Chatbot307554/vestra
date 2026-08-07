import { USE_MOCK_API, apiClient } from './apiClient';
import { mockRequest } from '../mocks/mockDatabase';
import { getProductById, getProducts } from '../mocks/productRepository';
import type { Product, VirtualTryOnRequest, VirtualTryOnResult } from '../types';

export async function getEligibleProducts(): Promise<Product[]> {
  if (USE_MOCK_API) {
    const products = getProducts().filter(
      (product) => product.isPublished && product.tryOnEligible
    );

    return mockRequest(products);
  }

  const response = await apiClient.get('/virtual-try-on/eligible');
  return response.data;
}

export async function getProductForTryOn(productId: string): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    const product = getProductById(productId);
    if (!product || !product.isPublished || !product.tryOnEligible) return null;
    return product;
  }
  try {
    const response = await apiClient.get(`/virtual-try-on/product/${productId}`);
    return response.data as Product;
  } catch {
    return null;
  }
}

export async function submitTryOn(request: VirtualTryOnRequest): Promise<VirtualTryOnResult> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 3500));
    const product = getProductById(request.productId);
    return {
      id: `vto-${Date.now()}`,
      productId: request.productId,
      productName: product?.name ?? 'Selected garment',
      productImage: product?.images[0]?.url ?? '',
      resultImage: product?.images[0]?.url ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43a?w=800&q=80',
      colour: request.variantColour,
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
  }
  const formData = new FormData();
  formData.append('productId', request.productId);
  formData.append('colour', request.variantColour);
  formData.append('consentGiven', String(request.consentGiven));
  if (request.imageFile) {
    formData.append('image', request.imageFile);
  }
  const response = await apiClient.post('/virtual-try-on', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export const vtoProcessingMessages = [
  'Preparing your image',
  'Applying the selected garment',
  'Finishing your preview',
];
