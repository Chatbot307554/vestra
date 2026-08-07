import { useQuery } from '@tanstack/react-query';
import { getAdminUsers } from '@/services/adminService';
import { formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { initials } from '@/utils/formatters';
import type { User } from '@/types';

export function AdminUsersPage() {
  const { data: users, isLoading } = useQuery({ queryKey: ['admin-users'], queryFn: getAdminUsers });

  return (
    <div>
      <h1 className="font-display text-2xl lg:text-3xl mb-6">Customers</h1>

      {isLoading ? (
        <div className="h-64 bg-muted rounded-xl animate-pulse" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {(users as User[] | undefined)?.map((u: User) => (
                  <tr key={u.id} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarImage src={u.avatar} /><AvatarFallback>{initials(u.firstName, u.lastName)}</AvatarFallback></Avatar>
                        <div><p className="font-medium">{u.firstName} {u.lastName}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{formatDate(u.createdAt)}</td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{u.wishlistIds.length}</td>
                    <td className="py-3 px-4"><Badge variant={u.role === 'admin' ? 'default' : 'outline'} className="capitalize">{u.role}</Badge></td>
                    <td className="py-3 px-4"><Badge variant={u.isActive ? 'default' : 'destructive'}>{u.isActive ? 'Active' : 'Inactive'}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
