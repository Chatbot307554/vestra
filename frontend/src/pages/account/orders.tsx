import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { getOrdersByUserId } from '@/mocks/orders';
import { formatDate, formatPrice } from '@/utils/formatters';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AccountOrdersPage() {
  const user = useAuthStore((s) => s.user);
  const orders = user ? getOrdersByUserId(user.id) : [];

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 border border-border rounded-xl">
          <Package className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground mt-4">You haven't placed any orders yet.</p>
          <Button asChild className="mt-4"><Link to="/shop">Start Shopping</Link></Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-border rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">{order.status}</Badge>
                  <span className="font-semibold">{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-2 shrink-0">
                    <img src={item.productImage} alt={item.productName} className="w-16 h-20 object-cover rounded" />
                    <div className="text-sm"><p className="font-medium line-clamp-1">{item.productName}</p><p className="text-muted-foreground">{item.colour} · {item.size}</p><p className="text-muted-foreground">Qty: {item.quantity}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated delivery: {order.estimatedDelivery}</span>
                <Link to={`/account/orders/${order.id}`} className="font-medium hover:underline">View details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
