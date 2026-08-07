import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { mockProducts } from '@/mocks/products';
import { formatPrice } from '@/utils/formatters';

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return mockProducts.filter((p) => p.isPublished && (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))).slice(0, 6);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Search">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="relative bg-background shadow-xl animate-in fade-in slide-in-from-top duration-200">
        <div className="container-vestra py-6">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input autoFocus type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products, categories..." className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) { navigate(`/search?q=${encodeURIComponent(query)}`); setOpen(false); } }} />
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2"><X className="h-5 w-5" /></button>
          </div>
          {results.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {results.map((p) => (
                <button key={p.id} onClick={() => { navigate(`/product/${p.slug}`); setOpen(false); }} className="flex gap-3 text-left hover:bg-muted p-2 rounded-lg transition-colors">
                  <img src={p.images[0]?.url} alt={p.name} className="w-16 h-20 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(p.salePrice ?? p.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="mt-6 text-muted-foreground text-sm">No results for "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
}
