// ============================================================
// VESTRA — Navigation Configuration
// ============================================================

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface AccountNavItem {
  label: string;
  href: string;
  icon: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

// ── Main navigation ───────────────────────────────────────────

export const mainNavItems: NavItem[] = [
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'New In', href: '/new-in' },
  {
    label: 'Clothing',
    href: '/shop',
    children: [
      { label: 'Dresses', href: '/category/dresses' },
      { label: 'Tops', href: '/category/tops' },
      { label: 'Knitwear', href: '/category/knitwear' },
      { label: 'Trousers & Jeans', href: '/category/trousers' },
      { label: 'Outerwear', href: '/category/outerwear' },
      { label: 'Skirts', href: '/category/skirts' },
      { label: 'Jumpsuits', href: '/category/jumpsuits' },
      { label: 'Activewear', href: '/category/activewear' },
    ],
  },
  {
    label: 'Collections',
    href: '/shop',
    children: [
      { label: 'Autumn Edit', href: '/collection/autumn-edit' },
      { label: 'The Workwear Edit', href: '/collection/workwear-edit' },
      { label: 'Weekend Essentials', href: '/collection/weekend-essentials' },
    ],
  },
  { label: 'Virtual Fitting Room', href: '/virtual-fitting-room' },
];

// ── Account navigation ────────────────────────────────────────

export const accountNavItems: AccountNavItem[] = [
  { label: 'My Orders', href: '/account/orders', icon: 'Package' },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'Heart' },
  { label: 'Addresses', href: '/account/addresses', icon: 'MapPin' },
  { label: 'Measurements', href: '/account/measurements', icon: 'Ruler' },
  { label: 'My Recommendations', href: '/account/recommendations', icon: 'Sparkles' },
  { label: 'Settings', href: '/account/settings', icon: 'Settings' },
];

// ── Footer links ──────────────────────────────────────────────

export const footerLinks: {
  customerCare: FooterLinkItem[];
  company: FooterLinkItem[];
  technology: FooterLinkItem[];
} = {
  customerCare: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Delivery & Returns', href: '/delivery-returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  company: [
    { label: 'About VESTRA', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Settings', href: '/privacy' },
  ],
  technology: [
    { label: 'Virtual Fitting Room', href: '/virtual-fitting-room' },
    { label: 'Size Recommendation', href: '/size-guide' },
    { label: 'How It Works', href: '/about' },
  ],
};
