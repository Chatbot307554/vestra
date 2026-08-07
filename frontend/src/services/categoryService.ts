import { USE_MOCK_API, apiClient } from './apiClient';
import { mockCategories, mockCollections, getCategoryBySlug, getCollectionBySlug, getSubcategories } from '../mocks/categories';
import { mockRequest } from '../mocks/mockDatabase';
import type { Category, Collection } from '../types';

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK_API) return mockRequest(mockCategories);
  const response = await apiClient.get('/categories');
  return response.data;
}

export async function getCollections(): Promise<Collection[]> {
  if (USE_MOCK_API) return mockRequest(mockCollections);
  const response = await apiClient.get('/collections');
  return response.data;
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return getCategoryBySlug(slug) || null;
  }
  const response = await apiClient.get(`/categories/${slug}`);
  return response.data;
}

export async function getCollection(slug: string): Promise<Collection | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return getCollectionBySlug(slug) || null;
  }
  const response = await apiClient.get(`/collections/${slug}`);
  return response.data;
}

export async function getSubcategoriesByParent(parentId: string): Promise<Category[]> {
  if (USE_MOCK_API) return mockRequest(getSubcategories(parentId));
  const response = await apiClient.get(`/categories?parentId=${parentId}`);
  return response.data;
}
