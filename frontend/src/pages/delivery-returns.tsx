import { Truck, Package, RefreshCcw, Clock } from 'lucide-react';
import { brand } from '@/config/brand';

const deliveryOptions = [
  { name: 'Standard Delivery', time: '3-5 working days', cost: 'Free over £75 (£3.95 under)', icon: Truck },
  { name: 'Express Delivery', time: '1-2 working days', cost: '£7.95', icon: Clock },
  { name: 'Next Day Delivery', time: 'Next working day (order before 2pm)', cost: '£12.95', icon: Package },
];

export function DeliveryReturnsPage() {
  return (
    <div className="container-vestra py-12 lg:py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl lg:text-5xl mb-4 text-center">Delivery & Returns</h1>
      <p className="text-muted-foreground text-center mb-12">Everything you need to know about getting your order and sending it back.</p>

      <section className="mb-12">
        <h2 className="font-display text-2xl mb-6">Delivery Options</h2>
        <div className="space-y-4">
          {deliveryOptions.map((opt) => (
            <div key={opt.name} className="flex items-start gap-4 border border-border rounded-xl p-5">
              <opt.icon className="h-6 w-6 text-muted-foreground shrink-0" />
              <div>
                <p className="font-medium">{opt.name}</p>
                <p className="text-sm text-muted-foreground">{opt.time}</p>
                <p className="text-sm text-muted-foreground mt-1">{opt.cost}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Free standard delivery on orders over {brand.currencySymbol}{brand.deliveryThreshold}. All orders are dispatched from our London warehouse.</p>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-2xl mb-4">Returns</h2>
        <div className="flex items-start gap-4 bg-muted rounded-xl p-5 mb-4">
          <RefreshCcw className="h-6 w-6 text-muted-foreground shrink-0" />
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">We offer <strong className="text-foreground">30-day free returns</strong> on all unworn items with tags attached. Returns are free for UK customers.</p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Log into your account and go to My Orders</li>
              <li>Select the order and items you wish to return</li>
              <li>Print the prepaid returns label</li>
              <li>Drop off at any Royal Mail or Evri location</li>
            </ol>
            <p className="text-sm text-muted-foreground">Refunds are processed within 5 working days of receiving your return. Original delivery charges are non-refundable.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-4">International Shipping</h2>
        <p className="text-sm text-muted-foreground leading-7">We currently ship to the UK and selected EU countries. International delivery costs and times vary by destination. Any import duties or taxes are calculated at checkout. Unfortunately, we are unable to offer free returns on international orders at this time.</p>
      </section>
    </div>
  );
}
