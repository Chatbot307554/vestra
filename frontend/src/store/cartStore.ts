import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  promoCode: string | undefined;
  discount: number;

  addItem: (product: Product, variantId: string, colour: string, size: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateVariant: (itemId: string, variantId: string, colour: string, size: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string, discount: number) => void;
  removePromoCode: () => void;

  getSubtotal: () => number;
  getTotal: (deliveryCost: number) => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: undefined,
      discount: 0,

      addItem: (product, variantId, colour, size, quantity) => {
        const existing = get().items.find(
          (i) => i.productId === product.id && i.variantId === variantId
        );
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            productId: product.id,
            product,
            variantId,
            colour,
            size,
            quantity,
            price: product.salePrice ?? product.price,
          };
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (itemId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.id !== itemId)
            : state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        })),

      updateVariant: (itemId, variantId, colour, size) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, variantId, colour, size } : i
          ),
        })),

      clearCart: () => set({ items: [], promoCode: undefined, discount: 0 }),

      applyPromoCode: (code, discount) => set({ promoCode: code, discount }),

      removePromoCode: () => set({ promoCode: undefined, discount: 0 }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotal: (deliveryCost) => {
        const subtotal = get().getSubtotal();
        return Math.max(0, subtotal - get().discount + deliveryCost);
      },

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'vestra-cart' }
  )
);
