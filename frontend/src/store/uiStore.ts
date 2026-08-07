import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  announcementDismissed: boolean;
  cookieBannerDismissed: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  dismissAnnouncement: () => void;
  dismissCookieBanner: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      cartDrawerOpen: false,
      searchOpen: false,
      mobileMenuOpen: false,
      announcementDismissed: false,
      cookieBannerDismissed: false,
      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      dismissAnnouncement: () => set({ announcementDismissed: true }),
      dismissCookieBanner: () => set({ cookieBannerDismissed: true }),
    }),
    {
      name: 'vestra-ui',
      partialize: (state) => ({
        announcementDismissed: state.announcementDismissed,
        cookieBannerDismissed: state.cookieBannerDismissed,
      }),
    }
  )
);
