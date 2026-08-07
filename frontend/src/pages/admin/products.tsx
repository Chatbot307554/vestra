import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Plus, Upload, MoreHorizontal, Eye, Pencil, Copy, Trash2, Globe, GlobeLock, PackageOpen, CheckSquare, Square } from 'lucide-react';
import { toast } from 'sonner';
import { getAdminProducts, deleteAdminProduct, duplicateAdminProduct, setAdminProductPublished, bulkSetAdminProductPublished, bulkDeleteAdminProducts } from '@/services/adminService';
import { formatPrice } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CsvImportDialog } from './csv-import-dialog';
import { Spinner } from '@/components/ui/spinner';
import type { Product } from '@/types';

const categoryOptions = ['dresses', 'tops', 'knitwear', 'trousers', 'outerwear', 'jumpsuits', 'activewear'];

export function AdminProductsPage() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError } = useQuery({ queryKey: ['admin-products'], queryFn: getAdminProducts });
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminProduct(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-products'] }); queryClient.invalidateQueries({ queryKey: ['products'] }); queryClient.invalidateQueries({ queryKey: ['admin-inventory'] }); toast.success('Product deleted'); setDeleteTarget(null); },
  });
  const duplicateMutation = useMutation({
    mutationFn: (id: string) => duplicateAdminProduct(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-products'] }); toast.success('Product duplicated as draft'); },
  });
  const publishMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) => setAdminProductPublished(id, published),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-products'] }); queryClient.invalidateQueries({ queryKey: ['products'] }); },
  });
  const bulkPublishMutation = useMutation({
    mutationFn: ({ ids, published }: { ids: string[]; published: boolean }) => bulkSetAdminProductPublished(ids, published),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-products'] }); queryClient.invalidateQueries({ queryKey: ['products'] }); setSelectedIds([]); toast.success('Bulk update complete'); },
  });
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => bulkDeleteAdminProducts(ids),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-products'] }); queryClient.invalidateQueries({ queryKey: ['products'] }); queryClient.invalidateQueries({ queryKey: ['admin-inventory'] }); setSelectedIds([]); setBulkDeleteOpen(false); toast.success('Products deleted'); },
  });

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      if (query) { const q = query.toLowerCase(); if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false; }
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (statusFilter === 'published' && !p.isPublished) return false;
      if (statusFilter === 'draft' && p.isPublished) return false;
      if (stockFilter !== 'all' && p.stockStatus !== stockFilter) return false;
      return true;
    });
  }, [products, query, categoryFilter, statusFilter, stockFilter]);

  const allSelected = filtered.length > 0 && filtered.every((p) => selectedIds.includes(p.id));
  const toggleAll = () => setSelectedIds(allSelected ? [] : filtered.map((p) => p.id));
  const toggleOne = (id: string) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your product catalogue, variants and availability.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setCsvOpen(true)}><Upload className="h-4 w-4 mr-2" /> Import CSV</Button>
          <Link to="/admin/products/new"><Button><Plus className="h-4 w-4 mr-2" /> Add Product</Button></Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Categories</SelectItem>{categoryOptions.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Stock" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Stock</SelectItem><SelectItem value="in_stock">In Stock</SelectItem><SelectItem value="low_stock">Low Stock</SelectItem><SelectItem value="out_of_stock">Out of Stock</SelectItem></SelectContent>
        </Select>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <Button variant="outline" size="sm" onClick={() => bulkPublishMutation.mutate({ ids: selectedIds, published: true })} disabled={bulkPublishMutation.isPending}>Publish</Button>
          <Button variant="outline" size="sm" onClick={() => bulkPublishMutation.mutate({ ids: selectedIds, published: false })} disabled={bulkPublishMutation.isPending}>Unpublish</Button>
          <Button variant="destructive" size="sm" onClick={() => setBulkDeleteOpen(true)} disabled={bulkDeleteMutation.isPending}>Delete</Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>Clear</Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64"><Spinner /></div>
      ) : isError ? (
        <Card className="p-8 text-center text-muted-foreground">Failed to load products. Please try again.</Card>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <PackageOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium">No products found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or add a new product.</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 w-10">
                    <button onClick={toggleAll}>{allSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}</button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">SKU / Variants</th>
                  <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Inventory</th>
                  <th className="text-left py-3 px-4 font-semibold hidden xl:table-cell">AI Features</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                  return (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <button onClick={() => toggleOne(p.id)}>{selectedIds.includes(p.id) ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}</button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {p.images[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-10 h-12 object-cover rounded" /> : <div className="w-10 h-12 bg-muted rounded flex items-center justify-center"><PackageOpen className="h-4 w-4 text-muted-foreground" /></div>}
                          <div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.brand}</p></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <p className="text-xs text-muted-foreground">{p.variants.length} variants</p>
                        <p className="text-xs text-muted-foreground">{p.variants[0]?.sku || '—'}</p>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell capitalize text-muted-foreground">{p.category}</td>
                      <td className="py-3 px-4">{formatPrice(p.salePrice ?? p.price)}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <Badge variant={p.stockStatus === 'in_stock' ? 'default' : p.stockStatus === 'low_stock' ? 'secondary' : 'destructive'} className="capitalize">{p.stockStatus.replace('_', ' ')}</Badge>
                        <p className="text-xs text-muted-foreground mt-0.5">{totalStock} units</p>
                      </td>
                      <td className="py-3 px-4 hidden xl:table-cell">
                        <div className="flex gap-1">
                          {p.tryOnEligible && <Badge variant="outline" className="text-xs">VTO</Badge>}
                          {p.sizeRecommendationEligible && <Badge variant="outline" className="text-xs">Size Rec</Badge>}
                          {!p.tryOnEligible && !p.sizeRecommendationEligible && <span className="text-xs text-muted-foreground">—</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4"><Badge variant={p.isPublished ? 'default' : 'outline'}>{p.isPublished ? 'Published' : 'Draft'}</Badge></td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild><Link to={`/product/${p.slug}`} className="flex items-center gap-2"><Eye className="h-4 w-4" /> View storefront</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link to={`/admin/products/${p.id}/edit`} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Edit</Link></DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateMutation.mutate(p.id)}><Copy className="h-4 w-4 mr-2" /> Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => publishMutation.mutate({ id: p.id, published: !p.isPublished })}>
                              {p.isPublished ? <><GlobeLock className="h-4 w-4 mr-2" /> Unpublish</> : <><Globe className="h-4 w-4 mr-2" /> Publish</>}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(p)}><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Single delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{deleteTarget?.name}" and all its variants. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)} disabled={deleteMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirmation */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedIds.length} products?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete the selected products and all their variants. This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => bulkDeleteMutation.mutate(selectedIds)} disabled={bulkDeleteMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CsvImportDialog open={csvOpen} onOpenChange={setCsvOpen} />
    </div>
  );
}
