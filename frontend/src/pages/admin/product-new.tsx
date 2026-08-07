import { useNavigate } from 'react-router-dom';
import { ProductForm } from './product-form';

export function AdminProductNewPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6">
        <button onClick={() => navigate('/admin/products')} className="text-sm text-muted-foreground hover:text-foreground mb-2">← Back to Products</button>
        <h1 className="font-display text-2xl lg:text-3xl">Add Product</h1>
        <p className="text-sm text-muted-foreground mt-1">Create a new product in your catalogue.</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
