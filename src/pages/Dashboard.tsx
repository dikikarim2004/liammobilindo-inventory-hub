import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { StockByBrandChart } from '@/components/dashboard/StockByBrandChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { Car, ShoppingCart, TrendingUp, Wallet } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold">Selamat Datang, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Berikut ringkasan aktivitas showroom hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Stok"
          value={38}
          change={5}
          icon={Car}
          iconColor="bg-primary/10 text-primary"
        />
        <StatsCard
          title="Terjual Bulan Ini"
          value={12}
          change={20}
          icon={ShoppingCart}
          iconColor="bg-success/10 text-success"
        />
        <StatsCard
          title="Pendapatan"
          value={840000000}
          change={15}
          icon={TrendingUp}
          iconColor="bg-accent/10 text-accent"
          format="currency"
        />
        <StatsCard
          title="Laba Bersih"
          value={156000000}
          change={-3}
          icon={Wallet}
          iconColor="bg-info/10 text-info"
          format="currency"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <SalesChart />
        <StockByBrandChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RecentTransactions />
        <LowStockAlert />
      </div>
    </div>
  );
}
