// ============================================================
// VESTRA — Route Path Constants
// ============================================================

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  NEW_IN: '/new-in',
  WOMEN: '/women',
  MEN: '/men',
  CATEGORY: '/category/:slug',
  COLLECTION: '/collection/:slug',
  SEARCH: '/search',
  PRODUCT: '/product/:slug',
  VIRTUAL_FITTING_ROOM: '/virtual-fitting-room',
  SIZE_GUIDE: '/size-guide',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/:orderId',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ACCOUNT: '/account',
  ACCOUNT_PROFILE: '/account/profile',
  ACCOUNT_ORDERS: '/account/orders',
  ACCOUNT_ORDER_DETAIL: '/account/orders/:orderId',
  ACCOUNT_WISHLIST: '/account/wishlist',
  ACCOUNT_ADDRESSES: '/account/addresses',
  ACCOUNT_MEASUREMENTS: '/account/measurements',
  ACCOUNT_RECOMMENDATIONS: '/account/recommendations',
  ACCOUNT_SETTINGS: '/account/settings',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  DELIVERY_RETURNS: '/delivery-returns',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
  NOT_FOUND: '/404',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: '/admin/users/:userId',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_NEW: '/admin/products/new',
  ADMIN_PRODUCT_EDIT: '/admin/products/:productId/edit',
  ADMIN_PRODUCT_DETAIL: '/admin/products/:productId',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_INVENTORY: '/admin/inventory',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_DETAIL: '/admin/orders/:orderId',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_PROMOTIONS: '/admin/promotions',
  ADMIN_RECOMMENDATIONS: '/admin/recommendations',
  ADMIN_AI_FEATURES: '/admin/ai-features',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

// ── Route builder helpers ─────────────────────────────────────

export function categoryRoute(slug: string): string {
  return `/category/${slug}`;
}

export function collectionRoute(slug: string): string {
  return `/collection/${slug}`;
}

export function productRoute(slug: string): string {
  return `/product/${slug}`;
}

export function orderConfirmationRoute(orderId: string): string {
  return `/order-confirmation/${orderId}`;
}

export function accountOrderRoute(orderId: string): string {
  return `/account/orders/${orderId}`;
}

export function adminUserRoute(userId: string): string {
  return `/admin/users/${userId}`;
}

export function adminProductRoute(productId: string): string {
  return `/admin/products/${productId}`;
}

export function adminOrderRoute(orderId: string): string {
  return `/admin/orders/${orderId}`;
}
