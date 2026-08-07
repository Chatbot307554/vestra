import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from '@/services/productService';
import { ProductCard } from '@/components/product/product-card';
import { Skeleton } from '@/components/ui/skeleton';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const { data: results, isLoading } = useQuery({
    queryKey: ['search', q],
    queryFn: () => search(q),
    enabled: q.length > 0,
  });

  return (
    <div className="container-vestra py-8 lg:py-12">
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Search results for "{q}"</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-product rounded-lg" />)}
        </div>
      ) : results && results.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">{results.length} results</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      ) : (
        <div className="text-center py-20"><p className="text-muted-foreground">No products found. Try a different search term.</p></div>
      )}
    </div>
  );
}
