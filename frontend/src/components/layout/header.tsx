import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { brand } from '@/config/brand';
import { mainNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-200',
          scrolled ? 'shadow-sm' : ''
        )}
        role="banner"
      >
        <div className="container-vestra">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="font-display text-2xl lg:text-3xl tracking-tight font-bold lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {brand.name}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.href}
                    className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity py-2"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="p-2 hover:opacity-70 transition-opacity"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link to="/account" className="p-2 hover:opacity-70 transition-opacity hidden sm:block" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>

              <Link to="/account/wishlist" className="p-2 hover:opacity-70 transition-opacity relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                className="p-2 hover:opacity-70 transition-opacity relative"
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[10px] font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
