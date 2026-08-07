import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAdminProduct } from '@/services/adminService';
import { ProductForm } from './product-form';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';

export function AdminProductEditPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['admin-product', productId],
    queryFn: () => getAdminProduct(productId!),
    enabled: !!productId,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Spinner /></div>;
  }
  if (isError || !product) {
    return (
      <div>
        <button onClick={() => navigate('/admin/products')} className="text-sm text-muted-foreground hover:text-foreground mb-2">← Back to Products</button>
        <Card className="p-8 text-center text-muted-foreground">Product not found.</Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button onClick={() => navigate('/admin/products')} className="text-sm text-muted-foreground hover:text-foreground mb-2">← Back to Products</button>
        <h1 className="font-display text-2xl lg:text-3xl">Edit Product</h1>
        <p className="text-sm text-muted-foreground mt-1">{product.name}</p>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
