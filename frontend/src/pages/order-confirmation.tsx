import { useParams, Link } from 'react-router-dom';
import { Check, Package, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="container-vestra py-12 lg:py-20 text-center max-w-2xl">
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-success" />
      </div>
      <h1 className="font-display text-3xl lg:text-4xl mt-6">Order Confirmed</h1>
      <p className="text-muted-foreground mt-3">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
      <div className="bg-muted rounded-xl p-6 mt-8 text-left">
        <div className="flex justify-between items-center mb-4">
          <div><p className="text-sm text-muted-foreground">Order Number</p><p className="font-semibold text-lg">VST-2024-{orderId?.slice(-4) || '0000'}</p></div>
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Estimated delivery: {new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button asChild><Link to="/shop">Continue Shopping <ArrowRight className="h-4 w-4" /></Link></Button>
        <Button asChild variant="outline"><Link to="/account/orders">View My Orders</Link></Button>
      </div>
    </div>
  );
}
