import { X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { brand } from '@/config/brand';

export function AnnouncementBar() {
  const dismissed = useUIStore((s) => s.announcementDismissed);
  const dismiss = useUIStore((s) => s.dismissAnnouncement);

  if (dismissed) return null;

  return (
    <div className="bg-foreground text-background text-xs sm:text-sm py-2.5 px-4 relative" role="region" aria-label="Announcement">
      <div className="container-vestra flex items-center justify-center gap-4 text-center">
        <p className="font-medium tracking-wide">
          Free UK delivery on orders over {brand.currencySymbol}{brand.deliveryThreshold} · Easy 30-day returns
        </p>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
