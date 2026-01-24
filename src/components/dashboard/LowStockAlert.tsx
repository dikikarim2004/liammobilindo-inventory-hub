import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const lowStockBrands = [
  { brand: 'Daihatsu', count: 2 },
  { brand: 'Nissan', count: 1 },
  { brand: 'Mazda', count: 1 },
];

export function LowStockAlert() {
  return (
    <Card className="border-warning/50 bg-warning/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Stok Menipis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockBrands.map((item) => (
            <div
              key={item.brand}
              className="flex items-center justify-between p-3 rounded-lg bg-card"
            >
              <span className="font-medium">{item.brand}</span>
              <span className="text-warning font-semibold">{item.count} unit</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Pertimbangkan untuk menambah stok merek-merek di atas.
        </p>
      </CardContent>
    </Card>
  );
}
