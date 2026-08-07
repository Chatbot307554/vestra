import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '@/services/adminService';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Order } from '@/types';

const statusVariant = (status: string) => {
  if (status === 'delivered') return 'default';
  if (status === 'cancelled' || status === 'returned') return 'destructive';
  return 'secondary';
};

export function AdminOrdersPage() {
  const { data: orders, isLoading } = useQuery({ queryKey: ['admin-orders'], queryFn: getAdminOrders });

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Orders</h1>

      {isLoading ? (
        <div className="h-64 bg-muted rounded-xl animate-pulse" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">Order</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Items</th>
                  <th className="text-left py-3 px-4 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Payment</th>
                </tr>
              </thead>
              <tbody>
                {(orders as Order[] | undefined)?.map((o: Order) => (
                  <tr key={o.id} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{o.orderNumber}</td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{o.shippingAddress.firstName} {o.shippingAddress.lastName}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{formatDate(o.createdAt)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{o.items.length}</td>
                    <td className="py-3 px-4 font-medium">{formatPrice(o.total)}</td>
                    <td className="py-3 px-4"><Badge variant={statusVariant(o.status)} className="capitalize">{o.status}</Badge></td>
                    <td className="py-3 px-4 hidden md:table-cell"><Badge variant={o.paymentStatus === 'paid' ? 'default' : 'outline'} className="capitalize">{o.paymentStatus}</Badge></td>
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
