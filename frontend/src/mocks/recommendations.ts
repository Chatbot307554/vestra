import type { RecommendationGroup } from '../types';
import { getProductById } from './products';

function productById(id: string) {
  const p = getProductById(id);
  if (!p) throw new Error(`Product ${id} not found`);
  return p;
}

export const mockRecommendationGroups: RecommendationGroup[] = [
  {
    id: 'rg1',
    type: 'recommended_for_you',
    title: 'Recommended for You',
    subtitle: 'Based on your browsing history and style preferences',
    items: [
      { productId: 'p003', product: productById('p003'), score: 0.94, explanation: 'Matches your preferred style and fit', sourceContext: 'Based on products you viewed' },
      { productId: 'p009', product: productById('p009'), score: 0.88, explanation: 'Pairs well with items in your wishlist', sourceContext: 'Inspired by your wishlist' },
      { productId: 'p001', product: productById('p001'), score: 0.82, explanation: 'Popular in your recommended size', sourceContext: 'Trending in your size' },
      { productId: 'p005', product: productById('p005'), score: 0.79, explanation: 'Similar to products you viewed', sourceContext: 'Based on recently viewed' },
    ],
    isActive: true,
    placement: 'homepage',
  },
  {
    id: 'rg2',
    type: 'similar_styles',
    title: 'Similar Styles',
    subtitle: 'Pieces that share the same look and feel',
    items: [
      { productId: 'p004', product: productById('p004'), score: 0.91, explanation: 'Similar silhouette and fabric', sourceContext: 'Similar to this item' },
      { productId: 'p006', product: productById('p006'), score: 0.85, explanation: 'Same category and fit profile', sourceContext: 'Same category' },
      { productId: 'p010', product: productById('p010'), score: 0.78, explanation: 'Complementary style', sourceContext: 'Style match' },
    ],
    isActive: true,
    placement: 'product_detail',
  },
  {
    id: 'rg3',
    type: 'complete_the_look',
    title: 'Complete the Look',
    subtitle: 'Curated pieces that work together',
    items: [
      { productId: 'p009', product: productById('p009'), score: 0.93, explanation: 'Pairs well with this item', sourceContext: 'Stylist recommendation' },
      { productId: 'p011', product: productById('p011'), score: 0.87, explanation: 'Completes the outfit', sourceContext: 'Stylist recommendation' },
      { productId: 'p013', product: productById('p013'), score: 0.81, explanation: 'Perfect finishing piece', sourceContext: 'Stylist recommendation' },
    ],
    isActive: true,
    placement: 'product_detail',
  },
  {
    id: 'rg4',
    type: 'trending',
    title: 'Trending Now',
    subtitle: 'Popular with VESTRA customers this week',
    items: [
      { productId: 'p003', product: productById('p003'), score: 0.95, explanation: 'Popular in this collection', sourceContext: 'Best seller this week' },
      { productId: 'p001', product: productById('p001'), score: 0.90, explanation: 'Trending in your size', sourceContext: 'Trending' },
      { productId: 'p015', product: productById('p015'), score: 0.86, explanation: 'Popular in this collection', sourceContext: 'Trending' },
      { productId: 'p005', product: productById('p005'), score: 0.83, explanation: 'New arrival gaining attention', sourceContext: 'Trending' },
    ],
    isActive: true,
    placement: 'homepage',
  },
];

export function getRecommendationsByType(type: string): RecommendationGroup | undefined {
  return mockRecommendationGroups.find((g) => g.type === type && g.isActive);
}

export function getRecommendationsByPlacement(placement: string): RecommendationGroup[] {
  return mockRecommendationGroups.filter((g) => g.placement === placement && g.isActive);
}
