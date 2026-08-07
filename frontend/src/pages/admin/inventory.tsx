import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, PackageOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getAdminInventory, updateVariantStock } from '@/services/adminService';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

interface FlatVariant {
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  sku: string;
  colour: string;
  colourHex: string;
  size: string;
  stock: number;
}

function stockBadge(stock: number) {
  if (stock === 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (stock <= 5) return <Badge variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />Low stock</Badge>;
  return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />In stock</Badge>;
}

export function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError } = useQuery({ queryKey: ['admin-inventory'], queryFn: getAdminInventory });
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('0');

  const updateMutation = useMutation({
    mutationFn: ({ productId, variantId, stock }: { productId: string; variantId: string; stock: number }) => updateVariantStock(productId, variantId, stock),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-inventory'] }); queryClient.invalidateQueries({ queryKey: ['admin-products'] }); queryClient.invalidateQueries({ queryKey: ['products'] }); toast.success('Stock updated'); setEditingId(null); },
  });

  const flatVariants = useMemo<FlatVariant[]>(() => {
    if (!products) return [];
    const rows: FlatVariant[] = [];
    for (const p of products) {
      for (const v of p.variants) {
        rows.push({ productId: p.id, productName: p.name, productSlug: p.slug, variantId: v.id, sku: v.sku, colour: v.colour, colourHex: v.colourHex, size: v.size, stock: v.stock });
      }
    }
    return rows;
  }, [products]);

  const filtered = useMemo(() => {
    if (!query) return flatVariants;
    const q = query.toLowerCase();
    return flatVariants.filter((v) => v.productName.toLowerCase().includes(q) || v.sku.toLowerCase().includes(q) || v.colour.toLowerCase().includes(q));
  }, [flatVariants, query]);

  const startEdit = (variant: FlatVariant) => { setEditingId(variant.variantId); setEditValue(String(variant.stock)); };
  const saveEdit = (productId: string, variantId: string) => { updateMutation.mutate({ productId, variantId, stock: Number(editValue) }); };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl">Inventory</h1>
        <p className="text-sm text-muted-foreground mt-1">View and adjust stock levels across all product variants.</p>
      </div>

      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by product, SKU or colour..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64"><Spinner /></div>
      ) : isError ? (
        <Card className="p-8 text-center text-muted-foreground">Failed to load inventory.</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center"><PackageOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" /><p className="font-medium">No variants found</p><p className="text-sm text-muted-foreground mt-1">Try adjusting your search.</p></Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">SKU</th>
                <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Colour</th>
                <th className="text-left py-3 px-4 font-semibold">Size</th>
                <th className="text-left py-3 px-4 font-semibold">Stock</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
              </tr></thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.variantId} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{v.productName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{v.sku}</td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: v.colourHex }} /><span className="text-muted-foreground">{v.colour}</span></div>
                    </td>
                    <td className="py-3 px-4">{v.size}</td>
                    <td className="py-3 px-4">
                      {editingId === v.variantId ? (
                        <div className="flex items-center gap-1">
                          <Input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-20 h-8" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(v.productId, v.variantId); if (e.key === 'Escape') setEditingId(null); }} />
                          <button onClick={() => saveEdit(v.productId, v.variantId)} className="text-xs text-foreground hover:underline">Save</button>
                          <button onClick={() => setEditingId(null)} className="text-xs text-muted-foreground hover:underline">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(v)} className="font-medium hover:underline">{v.stock}</button>
                      )}
                    </td>
                    <td className="py-3 px-4">{stockBadge(v.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
