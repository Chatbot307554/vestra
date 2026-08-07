import { useQuery } from '@tanstack/react-query';
import { getAdminPromotions } from '@/services/adminService';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tag, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function AdminPromotionsPage() {
  const { data: promos, isLoading } = useQuery({ queryKey: ['admin-promotions'], queryFn: getAdminPromotions });

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Promotions</h1>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">{[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {(promos as any[] | undefined)?.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-ai-background flex items-center justify-center"><Tag className="h-5 w-5 text-ai" /></div>
                  <div>
                    <button onClick={() => { navigator.clipboard.writeText(p.code); toast.success('Code copied'); }} className="font-mono font-semibold text-sm hover:underline flex items-center gap-1">{p.code}<Copy className="h-3 w-3" /></button>
                    <p className="text-xs text-muted-foreground">{p.discountType === 'percentage' ? `${p.value}% off` : p.discountType === 'shipping' ? 'Free shipping' : `£${p.value} off`}</p>
                  </div>
                </div>
                <Badge variant={p.active ? 'default' : 'outline'}>{p.active ? 'Active' : 'Inactive'}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div><span className="text-foreground font-medium">Min spend:</span> £{p.minimumSpend}</div>
                <div><span className="text-foreground font-medium">Usage limit:</span> {p.usageLimit.toLocaleString()}</div>
                <div><span className="text-foreground font-medium">Start:</span> {p.startDate}</div>
                <div><span className="text-foreground font-medium">End:</span> {p.endDate}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
