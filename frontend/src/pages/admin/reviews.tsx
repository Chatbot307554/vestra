import { useQuery } from '@tanstack/react-query';
import { getAdminReviews } from '@/services/adminService';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Review } from '@/types';

export function AdminReviewsPage() {
  const { data: reviews, isLoading } = useQuery({ queryKey: ['admin-reviews'], queryFn: getAdminReviews });

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Reviews</h1>

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4">
          {(reviews as Review[] | undefined)?.map((r: Review) => (
            <Card key={r.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{r.title}</p>
                    {r.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.userName} · {formatDate(r.createdAt)} · Product: {r.productId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className={s <= r.rating ? 'h-3.5 w-3.5 fill-foreground text-foreground' : 'h-3.5 w-3.5 text-muted-foreground/30'} />)}
                  </div>
                  {r.isReported && <Badge variant="destructive" className="text-xs">Reported</Badge>}
                  <Badge variant={r.isApproved ? 'default' : 'outline'} className="text-xs">{r.isApproved ? 'Approved' : 'Pending'}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.body}</p>
              {r.fitFeedback && <p className="text-xs text-muted-foreground mt-2">Fit: {r.fitFeedback.replace('_', ' ')}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
