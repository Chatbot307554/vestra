import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Header } from '@/components/layout/header';
import { CartDrawer } from '@/components/layout/cart-drawer';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { SearchOverlay } from '@/components/layout/search-overlay';
import { Footer } from '@/components/layout/footer';

export function StorefrontLayout() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CartDrawer />
      <MobileMenu />
      <SearchOverlay />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
