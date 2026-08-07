import type { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ord001',
    orderNumber: 'VST-2024-00142',
    userId: 'u001',
    guestEmail: undefined,
    items: [
      { id: 'oi001', productId: 'p003', productName: 'Silk Wrap Dress', productImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', brand: 'VESTRA', colour: 'Midnight Blue', size: 'S', quantity: 1, price: 285 },
      { id: 'oi002', productId: 'p009', productName: 'Cashmere Crew Neck Jumper', productImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80', brand: 'VESTRA', colour: 'Oat', size: 'S', quantity: 1, price: 165 },
    ],
    shippingAddress: { id: 'addr-ord001', label: 'Shipping', firstName: 'Emma', lastName: 'Thompson', line1: '42 Notting Hill Gate', line2: 'Flat 3', city: 'London', county: 'Greater London', postcode: 'W11 3HX', country: 'United Kingdom', isDefault: false },
    deliveryOption: { id: 'del1', name: 'Standard Delivery', description: '3-5 working days', price: 0, estimatedDays: '3-5 working days' },
    subtotal: 450,
    discount: 0,
    deliveryCost: 0,
    total: 450,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-08-15T10:30:00Z',
    updatedAt: '2024-08-20T14:00:00Z',
    estimatedDelivery: '20/08/2024',
  },
  {
    id: 'ord002',
    orderNumber: 'VST-2024-00188',
    userId: 'u001',
    guestEmail: undefined,
    items: [
      { id: 'oi003', productId: 'p005', productName: 'Plissé Pleated Maxi Dress', productImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', brand: 'VESTRA', colour: 'Terracotta', size: 'XS', quantity: 1, price: 245 },
    ],
    shippingAddress: { id: 'addr-ord002', label: 'Shipping', firstName: 'Emma', lastName: 'Thompson', line1: '42 Notting Hill Gate', line2: 'Flat 3', city: 'London', county: 'Greater London', postcode: 'W11 3HX', country: 'United Kingdom', isDefault: false },
    deliveryOption: { id: 'del2', name: 'Express Delivery', description: '1-2 working days', price: 7.95, estimatedDays: '1-2 working days' },
    subtotal: 245,
    discount: 24.5,
    deliveryCost: 7.95,
    total: 228.45,
    promoCode: 'VESTRA10',
    status: 'dispatched',
    paymentStatus: 'paid',
    createdAt: '2024-09-20T15:00:00Z',
    updatedAt: '2024-09-21T09:00:00Z',
    estimatedDelivery: '25/09/2024',
  },
  {
    id: 'ord003',
    orderNumber: 'VST-2024-00215',
    userId: 'u002',
    guestEmail: undefined,
    items: [
      { id: 'oi004', productId: 'p015', productName: 'Tailored Overcoat', productImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80', brand: 'VESTRA', colour: 'Charcoal', size: 'M', quantity: 1, price: 395 },
      { id: 'oi005', productId: 'p018', productName: 'Merino Crew Neck Jumper', productImage: 'https://images.unsplash.com/photo-1614495879399-f34ffe84f3e1?w=400&q=80', brand: 'VESTRA', colour: 'Navy', size: 'M', quantity: 2, price: 125 },
    ],
    shippingAddress: { id: 'addr-ord003', label: 'Shipping', firstName: 'James', lastName: 'Wilson', line1: '18 King Street', city: 'Manchester', county: 'Greater Manchester', postcode: 'M2 6AW', country: 'United Kingdom', isDefault: false },
    deliveryOption: { id: 'del1', name: 'Standard Delivery', description: '3-5 working days', price: 0, estimatedDays: '3-5 working days' },
    subtotal: 645,
    discount: 0,
    deliveryCost: 0,
    total: 645,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2024-09-28T11:00:00Z',
    updatedAt: '2024-09-28T11:00:00Z',
    estimatedDelivery: '03/10/2024',
  },
];

export function getOrdersByUserId(userId: string): Order[] {
  return mockOrders.filter((o) => o.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return mockOrders.find((o) => o.orderNumber === orderNumber);
}
