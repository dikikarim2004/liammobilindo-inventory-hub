import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Car,
  Users,
  Receipt,
  FileText,
  Settings,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles: ('super_admin' | 'stock_manager' | 'cashier')[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    roles: ['super_admin', 'stock_manager', 'cashier'],
  },
  {
    label: 'Kendaraan',
    icon: Car,
    path: '/vehicles',
    roles: ['super_admin', 'stock_manager'],
  },
  {
    label: 'Konsumen',
    icon: Users,
    path: '/customers',
    roles: ['super_admin', 'stock_manager', 'cashier'],
  },
  {
    label: 'Transaksi',
    icon: Receipt,
    path: '/transactions',
    roles: ['super_admin', 'cashier'],
  },
  {
    label: 'Laporan',
    icon: FileText,
    path: '/reports',
    roles: ['super_admin'],
  },
  {
    label: 'Pengguna',
    icon: UserCog,
    path: '/users',
    roles: ['super_admin'],
  },
  {
    label: 'Pengaturan',
    icon: Settings,
    path: '/settings',
    roles: ['super_admin'],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenuItems = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Liam</h1>
              <p className="text-xs text-sidebar-muted -mt-0.5">mobilindo</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center mx-auto">
            <Car className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'sidebar-menu-item',
                isActive && 'active',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
            collapsed && 'px-0'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span>Tutup Sidebar</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
