import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', sales: 4, revenue: 280000000 },
  { month: 'Feb', sales: 6, revenue: 420000000 },
  { month: 'Mar', sales: 5, revenue: 350000000 },
  { month: 'Apr', sales: 8, revenue: 560000000 },
  { month: 'Mei', sales: 7, revenue: 490000000 },
  { month: 'Jun', sales: 9, revenue: 630000000 },
  { month: 'Jul', sales: 11, revenue: 770000000 },
  { month: 'Agu', sales: 8, revenue: 560000000 },
  { month: 'Sep', sales: 10, revenue: 700000000 },
  { month: 'Okt', sales: 12, revenue: 840000000 },
  { month: 'Nov', sales: 9, revenue: 630000000 },
  { month: 'Des', sales: 14, revenue: 980000000 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}M`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}jt`;
  }
  return value.toString();
};

export function SalesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Penjualan & Pendapatan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16, 100%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(16, 100%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(215, 75%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(215, 75%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: 'hsl(215, 15%, 45%)' }}
                axisLine={{ stroke: 'hsl(214, 20%, 90%)' }}
              />
              <YAxis
                yAxisId="left"
                className="text-xs"
                tick={{ fill: 'hsl(215, 15%, 45%)' }}
                axisLine={{ stroke: 'hsl(214, 20%, 90%)' }}
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs"
                tick={{ fill: 'hsl(215, 15%, 45%)' }}
                axisLine={{ stroke: 'hsl(214, 20%, 90%)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(214, 20%, 90%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number, name: string) => [
                  name === 'revenue'
                    ? new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(value)
                    : `${value} unit`,
                  name === 'revenue' ? 'Pendapatan' : 'Penjualan',
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(16, 100%, 60%)"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="sales"
                stroke="hsl(215, 75%, 35%)"
                strokeWidth={2}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Pendapatan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Unit Terjual</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
