import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Package, Heart, MapPin, Ruler, Sparkles, Settings, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { accountNavItems } from '@/config/navigation';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Package, Heart, MapPin, Ruler, Sparkles, Settings,
};

export function AccountLayout() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container-vestra py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><User className="h-6 w-6" /></div>
            )}
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {accountNavItems.map((item) => {
              const Icon = iconMap[item.icon] || Package;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50')}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </NavLink>
              );
            })}
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
