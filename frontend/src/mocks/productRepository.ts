import type { Product, ProductVariant, StockStatus } from '../types';
import { mockProducts } from './products';

const STORAGE_KEY = 'vestra-product-catalogue';

function load(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seed
  }
  const seeded = structuredClone(mockProducts);
  persist(seeded);
  return seeded;
}

function persist(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // storage may be full; in-memory copy still works for the session
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function computeStockStatus(totalStock: number): StockStatus {
  if (totalStock === 0) return 'out_of_stock';
  if (totalStock <= 5) return 'low_stock';
  return 'in_stock';
}

function genId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function uniqueSlug(base: string, products: Product[], excludeId?: string): string {
  let slug = base;
  let i = 1;
  while (products.some((p) => p.slug === slug && p.id !== excludeId)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export function getProducts(): Product[] {
  return clone(load());
}

export function getProductById(id: string): Product | undefined {
  const found = load().find((p) => p.id === id);
  return found ? clone(found) : undefined;
}

export function getProductBySlug(slug: string): Product | undefined {
  const found = load().find((p) => p.slug === slug);
  return found ? clone(found) : undefined;
}

export function createProduct(input: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = load();
  const product: Product = {
    ...input,
    id: genId('p'),
    createdAt: new Date().toISOString(),
  };
  products.unshift(product);
  persist(products);
  return clone(product);
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const products = load();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const merged: Product = { ...products[idx], ...updates, id, createdAt: products[idx].createdAt };
  products[idx] = merged;
  persist(products);
  return clone(merged);
}

export function deleteProduct(id: string): boolean {
  const products = load();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  persist(next);
  return true;
}

export function duplicateProduct(id: string): Product | undefined {
  const products = load();
  const source = products.find((p) => p.id === id);
  if (!source) return undefined;
  const baseSlug = uniqueSlug(`${source.slug}-copy`, products);
  const newVariants: ProductVariant[] = source.variants.map((v) => ({
    ...v,
    id: genId('v'),
    sku: `${v.sku}-COPY`,
  }));
  const copy: Product = {
    ...clone(source),
    id: genId('p'),
    slug: baseSlug,
    name: `${source.name} (Copy)`,
    isPublished: false,
    badges: [],
    variants: newVariants,
    reviewCount: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
  };
  products.unshift(copy);
  persist(products);
  return clone(copy);
}

export function setPublished(id: string, isPublished: boolean): Product | undefined {
  return updateProduct(id, { isPublished });
}

export function resetToSeedProducts(): Product[] {
  const seeded = structuredClone(mockProducts);
  persist(seeded);
  return clone(seeded);
}

export function bulkSetPublished(ids: string[], isPublished: boolean): Product[] {
  const products = load();
  const idSet = new Set(ids);
  const updated: Product[] = [];
  for (const p of products) {
    if (idSet.has(p.id)) {
      p.isPublished = isPublished;
      updated.push(clone(p));
    }
  }
  persist(products);
  return updated;
}

export function bulkDelete(ids: string[]): number {
  const products = load();
  const idSet = new Set(ids);
  const next = products.filter((p) => !idSet.has(p.id));
  const removed = products.length - next.length;
  if (removed > 0) persist(next);
  return removed;
}

export function recomputeStockStatus(product: Product): Product {
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  return { ...product, stockStatus: computeStockStatus(totalStock) };
}

export { uniqueSlug, computeStockStatus, genId };
