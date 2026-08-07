import { USE_MOCK_API, apiClient } from './apiClient';
import { mockDashboardMetrics, mockSalesData, mockTopProducts, mockRecentOrders, mockLowStockVariants, mockSystemIssues, mockPromotions } from '../mocks/dashboard';
import { mockUsers } from '../mocks/users';
import { mockOrders } from '../mocks/orders';
import { mockReviews } from '../mocks/reviews';
import { mockRequest } from '../mocks/mockDatabase';

export async function getAdminPromotions() {
  if (USE_MOCK_API) return mockRequest(mockPromotions);
  const response = await apiClient.get('/admin/promotions');
  return response.data;
}

export async function getAdminReviews() {
  if (USE_MOCK_API) return mockRequest(mockReviews);
  const response = await apiClient.get('/admin/reviews');
  return response.data;
}
import * as productRepo from '../mocks/productRepository';
import * as categoryRepo from '../mocks/categoryRepository';
import type { AdminDashboardMetrics, Product, Category } from '../types';

export async function getDashboardMetrics(): Promise<AdminDashboardMetrics> {
  if (USE_MOCK_API) return mockRequest(mockDashboardMetrics);
  const response = await apiClient.get('/admin/dashboard');
  return response.data;
}

export async function getAdminUsers() {
  if (USE_MOCK_API) return mockRequest(mockUsers);
  const response = await apiClient.get('/admin/users');
  return response.data;
}

export async function getAdminOrders() {
  if (USE_MOCK_API) return mockRequest(mockOrders);
  const response = await apiClient.get('/admin/orders');
  return response.data;
}

export async function getAdminProducts(): Promise<Product[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return productRepo.getProducts();
  }
  const response = await apiClient.get('/admin/products');
  return response.data;
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 200));
    return productRepo.getProductById(id) || null;
  }
  const response = await apiClient.get(`/admin/products/${id}`);
  return response.data;
}

export async function createAdminProduct(input: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    return productRepo.createProduct(input);
  }
  const response = await apiClient.post('/admin/products', input);
  return response.data;
}

export async function updateAdminProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    return productRepo.updateProduct(id, updates) ?? null;
  }
  const response = await apiClient.put(`/admin/products/${id}`, updates);
  return response.data;
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return productRepo.deleteProduct(id);
  }
  await apiClient.delete(`/admin/products/${id}`);
  return true;
}

export async function duplicateAdminProduct(id: string): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    return productRepo.duplicateProduct(id) || null;
  }
  const response = await apiClient.post(`/admin/products/${id}/duplicate`);
  return response.data;
}

export async function setAdminProductPublished(id: string, isPublished: boolean): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return productRepo.setPublished(id, isPublished) ?? null;
  }
  const response = await apiClient.patch(`/admin/products/${id}/published`, { isPublished });
  return response.data;
}

export async function bulkSetAdminProductPublished(ids: string[], isPublished: boolean): Promise<Product[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    return productRepo.bulkSetPublished(ids, isPublished);
  }
  const response = await apiClient.post('/admin/products/bulk/publish', { ids, isPublished });
  return response.data;
}

export async function bulkDeleteAdminProducts(ids: string[]): Promise<number> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 400));
    return productRepo.bulkDelete(ids);
  }
  const response = await apiClient.post('/admin/products/bulk/delete', { ids });
  return response.data.deleted;
}

export async function resetAdminProducts(): Promise<Product[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return productRepo.resetToSeedProducts();
  }
  const response = await apiClient.post('/admin/products/reset');
  return response.data;
}

// ── Categories ──────────────────────────────────────────────

export async function getAdminCategories(): Promise<Category[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return categoryRepo.getCategories();
  }
  const response = await apiClient.get('/admin/categories');
  return response.data;
}

export async function createAdminCategory(input: Omit<Category, 'id'>): Promise<Category> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return categoryRepo.createCategory(input);
  }
  const response = await apiClient.post('/admin/categories', input);
  return response.data;
}

export async function updateAdminCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return categoryRepo.updateCategory(id, updates) ?? null;
  }
  const response = await apiClient.put(`/admin/categories/${id}`, updates);
  return response.data;
}

export async function deleteAdminCategory(id: string): Promise<boolean> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return categoryRepo.deleteCategory(id);
  }
  await apiClient.delete(`/admin/categories/${id}`);
  return true;
}

// ── Inventory ──────────────────────────────────────────────

export async function getAdminInventory(): Promise<Product[]> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    return productRepo.getProducts();
  }
  const response = await apiClient.get('/admin/inventory');
  return response.data;
}

export async function updateVariantStock(productId: string, variantId: string, stock: number): Promise<Product | null> {
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 300));
    const product = productRepo.getProductById(productId);
    if (!product) return null;
    const variants = product.variants.map((v) => (v.id === variantId ? { ...v, stock } : v));
    const updated = { ...product, variants };
    return productRepo.updateProduct(productId, productRepo.recomputeStockStatus(updated)) ?? null;
  }
  const response = await apiClient.patch(`/admin/inventory/${productId}/variants/${variantId}`, { stock });
  return response.data;
}

export { mockSalesData, mockTopProducts, mockRecentOrders, mockLowStockVariants, mockSystemIssues, mockPromotions, mockReviews };
