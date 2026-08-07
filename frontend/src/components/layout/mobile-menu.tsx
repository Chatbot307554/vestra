import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { mainNavItems } from '@/config/navigation';

export function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-label="Menu">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xs bg-background shadow-xl flex flex-col h-full animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-display text-xl font-bold">VESTRA</span>
          <button onClick={() => setOpen(false)} aria-label="Close" className="p-2"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.label}>
                <Link to={item.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium border-b border-border/50">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pl-4 pb-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link to={child.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground">{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <Link to="/account" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">My Account</Link>
            <Link to="/account/wishlist" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">Wishlist</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
