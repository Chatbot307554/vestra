import { mockProducts } from './products';
import { mockCategories, mockCollections } from './categories';
import { mockUsers } from './users';
import { mockOrders } from './orders';
import { mockReviews } from './reviews';
import { mockDashboardMetrics, mockSalesData, mockTopProducts, mockRecentOrders, mockLowStockVariants, mockSystemIssues, mockPromotions } from './dashboard';
import { mockRecommendationGroups } from './recommendations';

export const mockDatabase = {
  products: mockProducts,
  categories: mockCategories,
  collections: mockCollections,
  users: mockUsers,
  orders: mockOrders,
  reviews: mockReviews,
  dashboard: mockDashboardMetrics,
  salesData: mockSalesData,
  topProducts: mockTopProducts,
  recentOrders: mockRecentOrders,
  lowStockVariants: mockLowStockVariants,
  systemIssues: mockSystemIssues,
  promotions: mockPromotions,
  recommendations: mockRecommendationGroups,
};

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockRequest<T>(data: T, minDelay = 250, maxDelay = 700): Promise<T> {
  const delayTime = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
  await delay(delayTime);
  return structuredClone(data);
}
