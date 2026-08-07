import type { Category } from '../types';
import { mockCategories } from './categories';

const STORAGE_KEY = 'vestra-category-catalogue';

function load(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Category[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seed
  }
  const seeded = structuredClone(mockCategories);
  persist(seeded);
  return seeded;
}

function persist(categories: Category[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch {
    // ignore
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function genId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function uniqueSlug(base: string, categories: Category[], excludeId?: string): string {
  let slug = base;
  let i = 1;
  while (categories.some((c) => c.slug === slug && c.id !== excludeId)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export function getCategories(): Category[] {
  return clone(load());
}

export function getCategoryById(id: string): Category | undefined {
  const found = load().find((c) => c.id === id);
  return found ? clone(found) : undefined;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const found = load().find((c) => c.slug === slug);
  return found ? clone(found) : undefined;
}

export function createCategory(input: Omit<Category, 'id'>): Category {
  const categories = load();
  const category: Category = { ...input, id: genId('c') };
  categories.push(category);
  persist(categories);
  return clone(category);
}

export function updateCategory(id: string, updates: Partial<Category>): Category | undefined {
  const categories = load();
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  categories[idx] = { ...categories[idx], ...updates, id };
  persist(categories);
  return clone(categories[idx]);
}

export function deleteCategory(id: string): boolean {
  const categories = load();
  const next = categories.filter((c) => c.id !== id);
  if (next.length === categories.length) return false;
  persist(next);
  return true;
}

export { uniqueSlug };
