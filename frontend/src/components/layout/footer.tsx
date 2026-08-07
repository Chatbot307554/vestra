import { Link } from 'react-router-dom';
import { Camera, Music2, Users } from 'lucide-react';
import { brand } from '@/config/brand';
import { footerLinks } from '@/config/navigation';

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container-vestra py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold">{brand.name}</Link>
            <p className="mt-3 text-sm text-background/70 max-w-xs">{brand.description}</p>
            <div className="flex gap-3 mt-4">
              <a href={brand.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70"><Camera className="h-5 w-5" /></a>
              <a href={brand.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:opacity-70"><Music2 className="h-5 w-5" /></a>
              <a href={brand.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70"><Users className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2">
              {footerLinks.customerCare.map((l) => <li key={l.href}><Link to={l.href} className="text-sm text-background/70 hover:text-background transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((l) => <li key={l.href}><Link to={l.href} className="text-sm text-background/70 hover:text-background transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Technology</h3>
            <ul className="space-y-2">
              {footerLinks.technology.map((l) => <li key={l.href}><Link to={l.href} className="text-sm text-background/70 hover:text-background transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-sm text-background/70 mb-3">Subscribe for early access to new collections and exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="bg-background/10 border border-background/20 rounded-md px-3 py-2 text-sm flex-1 placeholder:text-background/50 focus:outline-none focus:border-background/40" />
              <button type="submit" className="bg-background text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-background/90 transition-colors">Join</button>
            </form>
          </div>
        </div>
        <div className="border-t border-background/20 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/60">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="text-xs text-background/60">{brand.address} · {brand.email}</p>
        </div>
      </div>
    </footer>
  );
}
