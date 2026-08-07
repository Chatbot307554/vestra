import type { AdminDashboardMetrics } from '../types';

export const mockDashboardMetrics: AdminDashboardMetrics = {
  revenue: { total: 184250, change: 12.5, period: 'September 2024' },
  orders: { total: 847, change: 8.3, period: 'September 2024' },
  avgOrderValue: { total: 217.48, change: 3.8 },
  customers: { total: 12453, newThisMonth: 342 },
  products: { total: 24, published: 22, lowStock: 5 },
  vtoUsage: { total: 1842, helpfulRate: 78 },
  sizeRecUsage: { total: 2104, successRate: 91 },
};

export const mockSalesData = [
  { month: 'Apr', revenue: 142000, orders: 620 },
  { month: 'May', revenue: 156000, orders: 690 },
  { month: 'Jun', revenue: 138000, orders: 610 },
  { month: 'Jul', revenue: 165000, orders: 740 },
  { month: 'Aug', revenue: 172000, orders: 780 },
  { month: 'Sep', revenue: 184250, orders: 847 },
];

export const mockTopProducts = [
  { productId: 'p003', productName: 'Silk Wrap Dress', unitsSold: 142, revenue: 40470 },
  { productId: 'p001', productName: 'Heritage Wool Coat', unitsSold: 98, revenue: 41650 },
  { productId: 'p009', productName: 'Cashmere Crew Neck Jumper', unitsSold: 87, revenue: 14355 },
  { productId: 'p005', productName: 'Plissé Pleated Maxi Dress', unitsSold: 76, revenue: 18620 },
  { productId: 'p015', productName: 'Tailored Overcoat', unitsSold: 54, revenue: 21330 },
];

export const mockRecentOrders = [
  { id: 'ord003', orderNumber: 'VST-2024-00215', customer: 'James Wilson', total: 645, status: 'processing', date: '28/09/2024' },
  { id: 'ord002', orderNumber: 'VST-2024-00188', customer: 'Emma Thompson', total: 228.45, status: 'dispatched', date: '20/09/2024' },
  { id: 'ord001', orderNumber: 'VST-2024-00142', customer: 'Emma Thompson', total: 450, status: 'delivered', date: '15/08/2024' },
];

export const mockLowStockVariants = [
  { productId: 'p002', productName: 'Belted Trench Coat', sku: 'BTC-STN-M', size: 'M', colour: 'Stone', stock: 1 },
  { productId: 'p004', productName: 'Broderie Anglaise Midi Dress', sku: 'BAD-WHT-L', size: 'L', colour: 'White', stock: 1 },
  { productId: 'p001', productName: 'Heritage Wool Coat', sku: 'HWC-CAM-XL', size: 'XL', colour: 'Camel', stock: 2 },
  { productId: 'p002', productName: 'Belted Trench Coat', sku: 'BTC-STN-XS', size: 'XS', colour: 'Stone', stock: 2 },
];

export const mockSystemIssues = [
  { id: 'iss1', severity: 'warning', message: 'Size Recommendation model latency above threshold (1.2s)', time: '2 hours ago' },
  { id: 'iss2', severity: 'info', message: 'Virtual Try-On provider maintenance scheduled for 03/10/2024', time: '5 hours ago' },
  { id: 'iss3', severity: 'error', message: '3 product images failed to upload to CDN', time: '1 day ago' },
];

export const mockPromotions = [
  { id: 'promo1', code: 'VESTRA10', discountType: 'percentage', value: 10, minimumSpend: 0, startDate: '01/09/2024', endDate: '31/12/2024', usageLimit: 1000, active: true },
  { id: 'promo2', code: 'FREESHIP', discountType: 'shipping', value: 0, minimumSpend: 50, startDate: '01/08/2024', endDate: '31/12/2024', usageLimit: 5000, active: true },
  { id: 'promo3', code: 'AUTUMN15', discountType: 'percentage', value: 15, minimumSpend: 200, startDate: '15/09/2024', endDate: '15/11/2024', usageLimit: 500, active: true },
  { id: 'promo4', code: 'WELCOME', discountType: 'percentage', value: 20, minimumSpend: 0, startDate: '01/01/2024', endDate: '31/12/2024', usageLimit: 200, active: false },
];
