import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const transactions = [
  {
    id: '1',
    type: 'sale',
    vehicle: 'Toyota Avanza 2021',
    customer: 'Budi Santoso',
    amount: 185000000,
    date: '2024-01-20',
  },
  {
    id: '2',
    type: 'purchase',
    vehicle: 'Honda Jazz 2019',
    customer: 'Andi Wijaya',
    amount: 145000000,
    date: '2024-01-19',
  },
  {
    id: '3',
    type: 'sale',
    vehicle: 'Suzuki Ertiga 2020',
    customer: 'Siti Rahayu',
    amount: 165000000,
    date: '2024-01-18',
  },
  {
    id: '4',
    type: 'purchase',
    vehicle: 'Mitsubishi Xpander 2022',
    customer: 'Joko Prasetyo',
    amount: 220000000,
    date: '2024-01-17',
  },
  {
    id: '5',
    type: 'sale',
    vehicle: 'Daihatsu Xenia 2020',
    customer: 'Maria Sulistyo',
    amount: 155000000,
    date: '2024-01-16',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
};

export function RecentTransactions() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Transaksi Terbaru</CardTitle>
        <a href="/transactions" className="text-sm text-accent hover:underline">
          Lihat Semua
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    tx.type === 'sale'
                      ? 'bg-success/10 text-success'
                      : 'bg-info/10 text-info'
                  }`}
                >
                  {tx.type === 'sale' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{tx.vehicle}</p>
                  <p className="text-sm text-muted-foreground">{tx.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === 'sale' ? 'text-success' : 'text-info'
                  }`}
                >
                  {tx.type === 'sale' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
                <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
