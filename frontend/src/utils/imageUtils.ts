export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43a?w=800&q=80';

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_IMAGE) {
    img.src = FALLBACK_IMAGE;
  }
}

export function getProductImageUrl(url: string | undefined): string {
  return url || FALLBACK_IMAGE;
}
