import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';

export function AccountWishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-xl">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground mt-4">Your wishlist is empty.</p>
          <p className="text-sm text-muted-foreground mt-1">Tap the heart icon on products to save them here.</p>
          <Button asChild className="mt-4"><Link to="/shop">Discover Products</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item) => <ProductCard key={item.productId} product={item.product} />)}
        </div>
      )}
    </div>
  );
}
